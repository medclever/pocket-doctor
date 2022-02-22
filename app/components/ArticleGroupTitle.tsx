import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import params from '../constants/params';
import {inject, observer} from 'mobx-react/native';
import {Storages} from '../constants/storages';
import {IStorageProps, IArticlePartsGroupTitle} from 'app/types';

export interface IArticleGroupTitleProps extends IStorageProps {
  data: IArticlePartsGroupTitle;
}

@inject(Storages.Storage)
@observer
export default class ArticleGroupTitle extends React.Component<
  IArticleGroupTitleProps
> {
  render() {
    let {data, storage} = this.props;
    const stylesContainer = {
      backgroundColor: data.color,
      borderColor: data.colorBorder,
    };
    const k = storage ? storage.settings.getFontSize() : 1;
    const stylesTitle = {
      fontSize: params.GroupTitleFontSize * k,
    };

    return (
      <View style={[styles.container, stylesContainer]}>
        <Text style={[styles.text, stylesTitle]}>{data.text}</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    width: 220,
    marginLeft: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingLeft: 15,

    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: params.BorderArticle,
    borderColor: '#d6d7da',

    backgroundColor: 'green',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
