import {observable, runInAction, computed, action} from 'mobx';
import autobind from 'autobind-decorator';
import {ScrollView} from 'react-native';
import {Params} from '../constants/params';
import ArticleRepository from '../repository/ArticleRepository';
import {AppStorage} from './AppStorage';

interface IArticleEntityMenu {
  id: number;
  title: string;
  image: string;
  is_locked: boolean;
}

@autobind
export class MenuStorage {
  @observable _items: IArticleEntityMenu[] = [];
  scrollViewRef: ScrollView | null;
  langId?: number;
  lastPosition?: number;

  constructor(public rootStore: AppStorage) {
    this.scrollViewRef = null;
  }

  async loadMenu() {
    this.langId = this.rootStore.settings.getCurrentLangId();
    if (!this.langId) {
      return;
    }

    const repoArticle = ArticleRepository.create(this.langId);
    return repoArticle
      .loadForMenu()
      .then((menuItems) => {
        const items = menuItems.map((i, index) => {
          const position = index - 1;
          const positionPrefix = i.code !== 'about' ? `${position}. ` : '';
          return {
            ...i,
            title: positionPrefix + i.title,
          }
        });
        this._items = items;
      });
  }

  @computed
  get items() {
    if (this.langId !== this.rootStore.settings.getCurrentLangId()) {
      runInAction(this.loadMenu);
    }

    return this._items;
  }

  @computed
  get position() {
    const targetId = this.rootStore.article.getTargetId();
    if (!targetId) return 0;
    if (!this._items.length) return 0;

    for (let i = 0; i < this._items.length; i++) {
      if (this._items[i].id === targetId) {
        return i;
      }
    }

    return 0;
  }

  @action
  setMenuScrollView(view: ScrollView | null) {
    this.scrollViewRef = view;
  }

  scrollMenu() {
    if (this.scrollViewRef === null) return;
    if (this.lastPosition === this.position) return;

    this.lastPosition = this.position;
    this.scrollViewRef.scrollTo({
      x: 0,
      y: this.position * (Params.MenuItemHeight + 1),
      animated: true,
    });
  }
}
