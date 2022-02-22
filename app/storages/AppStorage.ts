import {SettingsStorage} from './SettingsStorage';
import {MenuStorage} from './MenuStorage';
import {I18nStorage} from './I18nStorage';
import {ArticleStorage} from './ArticleStorage';
import {NavigationStorage} from './NavigationStorage';
import {observable, action} from 'mobx';

export class AppStorage {
  @observable isInit = false;

  settings = new SettingsStorage(this);
  menu = new MenuStorage(this);
  i18n = new I18nStorage(this);
  article = new ArticleStorage(this);
  navigation = new NavigationStorage(this);

  constructor() {
    this.init();
  }

  @action
  async init() {
    await this.navigation.init();
    this.isInit = true;
  }
}

export const appStorageInst = new AppStorage();
