import colors from './colors';
import {i18n, i18n_keys} from './i18n';
import {ArticleTextFields} from 'app/entity/ArticleEntity';
import {IArticlePartGroup} from 'app/types';

export default () => {
  let propsText: {label: ArticleTextFields; text?: string}[] = [
    {label: 'text'},
    {label: 'necessary', text: i18n.t(i18n_keys.ARTICLE_TITLE_NECESSARY)},
    {label: 'possible', text: i18n.t(i18n_keys.ARTICLE_TITLE_POSSIBLE)},
    {label: 'must_not', text: i18n.t(i18n_keys.ARTICLE_TITLE_MUST_NOT)},
    {label: 'important', text: i18n.t(i18n_keys.ARTICLE_TITLE_IMPORTANT)},
  ];
  let groupsParts: {[key in ArticleTextFields]: IArticlePartGroup} = {} as any;

  propsText.map((item) => {
    groupsParts[item.label] = {
      title: {
        color: colors[item.label],
        colorBorder: colors[item.label + 'Border'],
        text: item.text,
      },
      group: {
        colorBorder: colors[item.label + 'Border'],
        backgroundColor: colors[item.label + 'TextBackground'],
      },
    };
  });

  return groupsParts;
};
