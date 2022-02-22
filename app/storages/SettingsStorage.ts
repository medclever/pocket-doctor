import {action, observable, runInAction} from 'mobx';
import {AsyncStorage} from 'react-native';
import autobind from 'autobind-decorator';
import locale from 'react-native-locale-detector';
import {LanguageRepository} from '../repository/LanguageRepository';
import {Params} from '../constants/params';
import {AppStorage} from './AppStorage';
import {LanguageEntity} from 'app/entity/LanguageEntity';

let keyStorage = '@storage:settings';

export const SettingsKeys = {
  fontSize: 'fontSize',
  fontSizeView: 'fontSizeView',
  langId: 'langId',
};

interface IDataType {
  [key: string]: any;
}

@autobind
export class SettingsStorage {
  valueMax = 1.6;
  valueMin = 0.4;

  dataDefault: IDataType = {
    [SettingsKeys.fontSize]: 1,
    [SettingsKeys.fontSizeView]: 1,
    [SettingsKeys.langId]: null,
  };

  @observable data: IDataType = {};
  @observable languageAll: LanguageEntity[] = [];
  @observable loaded = false;

  constructor(public rootStore: AppStorage) {
    this.init();
  }

  @action
  async init() {
    let data = this.dataDefault;
    this.languageAll = await LanguageRepository.create()
      .loadAll();

    const lang = await this.getLanguageFromSystem();
    runInAction(() => {
      this.data = {...this.dataDefault, [SettingsKeys.langId]: lang.id};
      this.loaded = true;
    })

    // Set default language
    if (data[SettingsKeys.langId] == null) {
      data[SettingsKeys.langId] = lang.id;
      this.setParam(SettingsKeys.langId, lang.id);
    }
    // Override language if his locked
    if (Params.LangLocked && Params.LangLockedId) {
      data[SettingsKeys.langId] = Params.LangLockedId;
    }

    this.data = data;
    this.loaded = true;

    return this.setData(this.data);
  }

  async setData(data: IDataType) {
    // return AsyncStorage.setItem(keyStorage, JSON.stringify(data)).catch((e) =>
    //   console.log(e),
    // );
  }

  @action
  async setParam(key: string, value: any) {
    this.data[key] = value;
    return this.setData(this.data);
  }

  @action
  async clear() {
    // return AsyncStorage.removeItem(keyStorage).then(() => this.init());
  }

  getParam(key: string) {
    return this.data[key];
  }

  getFontSize(): number {
    return this.getParam(SettingsKeys.fontSize);
  }

  getCurrentLangId(): number {
    return this.getParam(SettingsKeys.langId);
  }

  getLanguageFromSystem(): Promise<LanguageEntity> {
    if (locale.match(/^en/)) {
      return LanguageRepository.create().loadByID(2);
    } else if (locale.match(/^ru/)) {
      return LanguageRepository.create().loadByID(1);
    } else {
      return LanguageRepository.create().loadByID(2);
    }
  }
}
