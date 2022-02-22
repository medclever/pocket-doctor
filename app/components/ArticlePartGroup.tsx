import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import ArticlePartText from './ArticlePartText';
import ArticlePartHtml from './ArticlePartHtml';
import ArticlePartGallery from './ArticlePartGallery';
import ArticleGroupTitle from './ArticleGroupTitle';
import params from '../constants/params';
import {
  IArticlePart,
  IDataTextHtml,
  IDataGroup,
  IDataGallery,
  IArticleOnLinkClick,
  IArticleOnImageClick,
} from 'app/types';

export interface IArticlePartGroupProps {
  data: IDataGroup;
  onLinkClick: IArticleOnLinkClick;
  onImageClick: IArticleOnImageClick;
}

export default class ArticlePartGroup extends React.Component<
  IArticlePartGroupProps
> {
  static propTypes = {
    onLinkClick: PropTypes.func,
    onImageClick: PropTypes.func,
  };

  static defaultProps = {
    onLinkClick: () => {},
    onImageClick: () => {},
  };

  render() {
    const {data} = this.props;
    let styleContainer = {};
    let styleContainerDynamic = {};

    if (data.group) {
      styleContainer = styles.partsContainer;
      styleContainerDynamic = {
        borderColor: data.group.colorBorder,
        backgroundColor: data.group.backgroundColor,
      };
    }

    if (data.parts && data.parts.length) {
      return (
        <View>
          {!!data.title && !!data.title.text && (
            <ArticleGroupTitle data={data.title} />
          )}
          {data.parts && (
            <View style={[styleContainer, styleContainerDynamic]}>
              {data.parts.map((part, index) => {
                return <View key={index}>{this.renderItem(part)}</View>;
              })}
            </View>
          )}
        </View>
      );
    } else {
      return null;
    }
  }

  renderItem(part: IArticlePart) {
    if (part.type === 'group') {
      return (
        <ArticlePartGroup
          data={part.data as IDataGroup}
          onLinkClick={this.props.onLinkClick}
          onImageClick={this.props.onImageClick}
        />
      );
    }
    if (part.type === 'text') {
      return <ArticlePartText data={part.data as IDataTextHtml} />;
    }
    if (part.type === 'html') {
      return (
        <ArticlePartHtml
          data={part.data as IDataTextHtml}
          onLinkClick={this.props.onLinkClick}
        />
      );
    }
    if (part.type === 'gallery') {
      return (
        <ArticlePartGallery
          data={part.data as IDataGallery}
          onImageClick={this.props.onImageClick}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  partsContainer: {
    marginBottom: 30,
    borderTopWidth: params.BorderArticle,
    borderBottomWidth: params.BorderArticle,
    marginTop: -params.BorderArticle,
  },
});
