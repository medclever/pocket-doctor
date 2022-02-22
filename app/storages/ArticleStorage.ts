import autobind from 'autobind-decorator';
import {observable, action} from 'mobx';
import {AsyncStorage} from 'react-native';
import ArticleRepository from '../repository/ArticleRepository';
import ArticleHelper from '../helper/ArticleHelper';
import params from '../constants/params';
import {AppStorage} from './AppStorage';
import ArticleEntity from 'app/entity/ArticleEntity';
import {IPartType} from 'app/types';

let keyStorage = '@storage:article:last';

export interface IArticleStorageData {
  loaded?: boolean;
  type?: IPartType;
  part?: IArticleStorageData | null;
  article?: ArticleEntity | null;
  title?: string;
  position?: number | string;
}

@autobind
export class ArticleStorage {
  @observable
  public data: IArticleStorageData = {};
  @observable
  public target_id?: number;
  loadingId?: number | null;

  dataDefault = {
    loaded: false,
    part: null,
    article: null,
    position: '',
    title: '',
  };
  cashKey: string | null = null;

  constructor(public rootStore: AppStorage) {
    this.data = this.dataDefault;
    this.loadingId = null;
  }

  @action
  loadById(id: number, with_scroll = false) {
    id = Number(id);
    this.setTargetId(id);

    if (with_scroll) {
      this.rootStore.menu.scrollMenu();
    }

    AsyncStorage.setItem(keyStorage, id + '');

    const langId = this.rootStore.settings.getCurrentLangId();
    const cashKey = `${id}_${langId}`;

    if (this.cashKey === cashKey) {
      return null;
    }
    this.cashKey = cashKey;

    let article: ArticleEntity;
    this.setData(this.dataDefault);

    return ArticleRepository.create(langId)
      .loadByID(id)
      .then((_article) => {
        article = _article;
        this.setData({
          ...this.data,
          article,
        });
        return ArticleHelper.prepareTextAsParts(article);
      })
      .then((parts) => {
        const data = {
          loaded: true,
          part: {
            type: 'group',
            data: {
              parts: parts,
            },
          },
          article,
          title: article.getTitleWithPosition(),
          position: article.position,
        };
        return this.setData(data);
      });
  }

  @action
  async loadByDefault(with_scroll = false) {
    return this.getDefaultId()
      .then((id) => this.loadById(Number(id), with_scroll))
      .catch(() => {});
  }

  async getDefaultId() {
    return AsyncStorage.getItem(keyStorage).then((lastArticleID) => {
      let result =
        lastArticleID && Number.parseInt(lastArticleID)
          ? Number.parseInt(lastArticleID)
          : params.ArticleDefault;

      return result;
    });
  }

  @action
  setData(data: IArticleStorageData) {
    this.data = data;
  }

  @action
  setTargetId(id: number) {
    this.target_id = id;
  }

  getCurrentId(): number | null {
    return this.data.article ? this.data.article.id : null;
  }

  getTargetId(): number | null {
    return this.target_id ? this.target_id : null;
  }
}
