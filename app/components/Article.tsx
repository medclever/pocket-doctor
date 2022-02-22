import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import params from '../constants/params';
import colors from '../constants/colors';
import {Spinner} from './Spinner';
import ArticlePartGroup from './ArticlePartGroup';
import {Storages} from '../constants/storages';
import {inject, observer} from 'mobx-react/native';
import {i18n_keys, i18n} from '../constants/i18n';
import autobind from 'autobind-decorator';
import {
  IStorageProps,
  IArticleOnLinkClick,
  IArticleOnImageClick,
} from 'app/types';

export interface IArticle extends IStorageProps {
  id: number;
  onLinkClick: IArticleOnLinkClick;
  onImageClick: IArticleOnImageClick;
}

@autobind
@inject(Storages.Storage)
@observer
export default class Article extends React.Component<IArticle> {
  render() {
    const {storage} = this.props;
    if (!storage) {
      return null;
    }
    let {loaded, title, part, article} = storage.article.data;

    const {onLinkClick, onImageClick} = this.props;
    const k = storage.settings.getFontSize();
    const stylesTitle = {
      fontSize: params.ArticleTitleFontSize * k,
    };

    if (article && article.id !== this.props.id) {
      loaded = false;
    }
    if (loaded) {
      return (
        <View style={styles.articleContainer}>
          <Text style={[styles.title, stylesTitle]}>{title}</Text>
          <ArticlePartGroup
            // TODO[eugen]: Тип
            data={part.data}
            onLinkClick={onLinkClick}
            onImageClick={onImageClick}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Spinner
            visible={!loaded}
            textContent={i18n.t(i18n_keys.LOADING) + '...'}
            textStyle={{color: colors.navBlueBackground}}
            color={colors.navBlueBackground}
            overlayColor="rgba(0, 0, 1, 0)"
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  articleContainer: {
    backgroundColor: 'white',
    marginBottom: 25,
  },
  title: {
    margin: 15,
    color: colors.articleTitleText,
  },
});
