import i18next from 'i18next';
import {I18n_EN} from './langs/en';
import {I18n_RU} from './langs/ru';
import keys from './keys';

let langsMap = {1: 'ru', 2: 'en'};

i18next.setLanguage = (langId) => {
  i18next.changeLanguage(langsMap[langId]);
};

i18next.init(
  {
    lng: 'ru',
    debug: false,
    resources: {
      en: {
        translation: I18n_EN,
      },
      ru: {
        translation: I18n_RU,
      },
    },
  },
  function (err, t) {},
);

export const i18n = i18next;
export const i18n_keys = keys;
