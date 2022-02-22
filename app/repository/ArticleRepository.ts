import { Params } from '../constants/params';
import { menu } from '../export/menu';
import { articles } from '../export/articles';
import { images } from '../export/images';
import { langId2Code } from '../helper/langId2Code';
import ArticleEntity from '../entity/ArticleEntity';

let _langPositions: {[key: string]: {[key: string]: number}} = {};

export default class ArticleRepository {
  constructor(public langID: number) {}

  static create(langId: number) {
    let article = new ArticleRepository(langId);
    article._preloadLangIdToPositions();

    return article;
  }

  async _preloadLangIdToPositions() {
    let langId = this.langID;
    const langCode = langId2Code(this.langID);

    if (!_langPositions[langId]) {
      _langPositions[langId] = {};
      let items = menu[langCode];
      items.map((i, index) => {
        _langPositions[langId][i.id] = index - 1;
      });
    }

    return _langPositions[langId];
  }

  async getPositionById(id: number) {
    let positions = await this._preloadLangIdToPositions();
    return positions[id];
  }

  async loadForMenu(): Promise<ArticleEntity[]> {
    const langCode = langId2Code(this.langID);
    return Promise.all(menu[langCode].map(item => this.loadByID(item.id) as Promise<ArticleEntity>));
  }

  async loadByID(id: number): Promise<ArticleEntity | undefined> {
    const langCode = langId2Code(this.langID);
    const data = articles.find(a => a.langCode == langCode && a.id == id);
    if (!data) return undefined;

    // choose the pictures with any languages
    const image = images.find(i => i.id === data.image_id);
    const position = await this.getPositionById(id);
    return new ArticleEntity(
      data.id,
      this.langID,
      data.code,
      position,
      Params.ArticleLocked && data.is_locked,
      image ? image.file : 'asset:/images/menu_acarine.png',
      data.title,
      data.necessary,
      data.possible,
      data.must_not,
      data.important,
      data.text,
    )
  }

  async loadByIDs(ids: number[]): Promise<ArticleEntity[]> {
    return Promise.all(ids.map(id => this.loadByID(id) as Promise<ArticleEntity>));
  }
}
