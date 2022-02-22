import React, {Component} from 'react';
import Article from '../components/Article';
import Buy from '../components/Buy';
import {inject, observer} from 'mobx-react/native';
import {Storages} from '../constants/storages';
import {
  IStorageProps,
  IArticleOnLinkClick,
  IArticleOnImageClick,
} from 'app/types';

export interface IArticleOrBuyProps extends IStorageProps {
  id: number | null;
  onLinkClick: IArticleOnLinkClick;
  onImageClick: IArticleOnImageClick;
}

@inject(Storages.Storage)
@observer
export default class ArticleOrBuy extends Component<IArticleOrBuyProps> {
  render() {
    const {storage} = this.props;
    if (!storage) {
      return null;
    }

    let {article} = storage.article.data;
    if (!article) {
      return null;
    }

    if (article.is_locked) {
      return <Buy article={article} />;
    } else {
      return (
        <Article
          id={article.id}
          onLinkClick={this.props.onLinkClick}
          onImageClick={this.props.onImageClick}
        />
      );
    }
  }
}
