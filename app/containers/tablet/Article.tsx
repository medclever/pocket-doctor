import React, {useCallback, FC} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import {Storages} from '../../constants/storages';
import colors from '../../constants/colors';
import ArticleOrBuy from '../ArticleOrBuy';
import {IStorageProps} from 'app/types';

export interface IArticleOrBuyTabletProps extends IStorageProps {}
const ArticleOrBuyTabletComponent: FC<IArticleOrBuyTabletProps> = ({
  storage,
}) => {
  if (!storage) {
    return null;
  }

  let articleId = storage.article.getTargetId();
  useCallback(async () => {
    await storage.article.loadByDefault(true);
    await storage.menu.loadMenu();
  }, [articleId]);

  return (
    <View style={styles.detail}>
      <ScrollView>
        <ArticleOrBuy
          key={articleId + ''}
          id={articleId}
          onLinkClick={(_articleId) => {
            storage.navigation.dispatchArticle(_articleId, true);
          }}
          onImageClick={(imageCurrent, images) => {
            storage.navigation.dispatchGallery(imageCurrent, images);
          }}
        />
      </ScrollView>
    </View>
  );
};

// TODO[eugen]: from consts
// var MASTER_WIDTH = 370;
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
  },
  toolbarMenu: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 23,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: colors.toolbarBackground,
    color: colors.toolbarText,
    borderColor: colors.borderColorToolbar,
    borderBottomWidth: 1,
  },
  toolbarDetail: {
    fontSize: 23,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    backgroundColor: colors.toolbarBackground,
    color: colors.toolbarText,
    borderColor: colors.borderColorToolbar,
    borderBottomWidth: 1,
  },
  master: {
    borderColor: colors.borderColorToolbar,
    borderRightWidth: 1,
    width: screenWidth * 0.3,
  },
  detail: {
    flex: 1,
    height: screenHeight,
  },
  drawerMaster: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerDetail: {
    flex: 1,
  },
});

export const ArticleOrBuyTablet: FC<IArticleOrBuyTabletProps> = inject(
  Storages.Storage,
)(observer((props) => <ArticleOrBuyTabletComponent {...props} />));
