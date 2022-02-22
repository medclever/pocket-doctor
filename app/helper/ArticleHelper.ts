import ArticleEntity, {ArticleTextFields} from '../entity/ArticleEntity';
import propsTranslate from '../constants/groupsParts';
import ImageRepository from '../repository/ImageRepository';
import ArticleRepository from '../repository/ArticleRepository';
import {IDataGallery, IArticlePart} from 'app/types';
const cheerio = require('react-native-cheerio');
var uuid = require('react-native-uuid');

let propsText: ArticleTextFields[] = [
  'text',
  'necessary',
  'possible',
  'must_not',
  'important',
];

export default class ArticleHelper {
  static prepareTextAsParts(article: ArticleEntity) {
    let repo = ArticleHelper;

    const result = propsText.map((prop) => {
      return repo
        .prepareSplitAsList(article[prop], article.lang_id)
        .then(function (parts) {
          let data = propsTranslate()[prop] || {};
          data.parts = parts;

          return {
            type: 'group',
            data: data,
          };
        });
    });

    return Promise.all(result);
  }

  static async prepareSplitAsList(
    text: string,
    langId: number,
  ): Promise<IArticlePart[]> {
    if (text.trim().length === 0) {
      return Promise.resolve([]);
    }

    const $ = cheerio.load(text, {
      withDomLvl1: true,
      normalizeWhitespace: false,
      xmlMode: true,
      decodeEntities: false,
    });
    let galleries: {[key: string]: IDataGallery} = {};
    const mArticle = ArticleRepository.create(langId);
    const mImage = ImageRepository.create(langId);

    return Promise.resolve()
      .then(() => {
        // Заменяем ссылки на реальные тексты
        let links = $('[data-link-id]')
          .map(function () {
            let $link = $(this),
              linkId = $link.attr('data-link-id');
            return mArticle.loadByID(linkId).then((article) => {
              $link
                .find('[data-link-position]')
                .replaceWith('' + article.position);
              $link.find('[data-link-name]').replaceWith(article.title);
              $link.replaceWith(
                `<a href="/article/${article.id}" data-link-id="${
                  article.id
                }">${$link.text()}</a>`,
              );
            });
          })
          .get();

        return Promise.all(links);
      })
      .then(() => {
        // Выдираем галерии и получаем список изображений
        $('.gallery-items').map(function () {
          let key = 'gallery_' + uuid.v4(),
            data: IDataGallery = {};
          data.images = $(this)
            .find('[data-image-id]')
            .map(function () {
              return $(this).attr('data-image-id');
            })
            .get();
          galleries[key] = data;
          $(this).replaceWith(key);
        });

        return galleries;
      })
      .then((galleries) => {
        // Загружаем данные о изображениях из списков
        let pImages = [];
        for (key in galleries) {
          ((key) => {
            pImages.push(
              mImage.loadByIDs(galleries[key].images).then((images) => {
                galleries[key] = images;
              }),
            );
          })(key);
        }

        return Promise.all(pImages);
      })
      .then(() => {
        // разбиваем по строкам
        text = $.html();
        return text.split(/\r?\n/);
      })
      .then((lines) => {
        // Устанавливаем тип компонента
        let pLines = lines.map((line) => {
          if (/^(gallery_).*/i.test(line)) {
            return Promise.resolve({
              type: 'gallery',
              data: {
                images: galleries[line],
              },
            });
          }
          if (/<[a-z][\s\S]*>/i.test(line)) {
            return Promise.resolve({
              type: 'html',
              data: {
                content: '<div>' + line + '</div>',
              },
            });
          } else {
            return Promise.resolve({
              type: 'text',
              data: {
                content: line,
              },
            });
          }
        });

        return Promise.all(pLines);
      });
  }
}
