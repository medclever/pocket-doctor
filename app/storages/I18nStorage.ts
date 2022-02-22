import autobind from 'autobind-decorator';
import {autorun} from 'mobx';
import {i18n} from '../constants/i18n';
import {AppStorage} from './AppStorage';

@autobind
export class I18nStorage {
  langId?: number;

  constructor(public rootStore: AppStorage) {
    autorun(() => {
      this.langId = this.rootStore.settings.getCurrentLangId();
      i18n.setLanguage(this.langId);
    });
  }
}
