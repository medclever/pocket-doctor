import React, {FC, useCallback} from 'react';
import {inject, observer} from 'mobx-react/native';
import {ScrollView} from 'react-native';
import {Storages} from '../../constants/storages';
import {IStorageProps} from 'app/types';
import ArticleOrBuy from '../ArticleOrBuy';

export interface IArticleWrap extends IStorageProps {
  route: any;
}

const _ArticleWrap: FC<IArticleWrap> = ({storage}) => {
  if (!storage) {
    return null;
  }

  const {dispatchArticle, dispatchGallery} = storage.navigation;
  let articleId = storage.article.getTargetId();

  return (
    <ScrollView>
      <ArticleOrBuy
        id={articleId}
        onLinkClick={(articleId) => {
          dispatchArticle(articleId);
        }}
        onImageClick={(imageCurrent, images) => {
          dispatchGallery(imageCurrent, images);
        }}
      />
    </ScrollView>
  );
};

export const ArticleWrap: FC<IArticleWrap> = inject(Storages.Storage)(
  observer((props) => <_ArticleWrap {...props} />),
);
