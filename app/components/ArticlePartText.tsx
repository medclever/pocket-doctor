import React from 'react';
import {Text, StyleSheet} from 'react-native';
import params from '../constants/params';
import colors from '../constants/colors';
import {inject, observer} from 'mobx-react/native';
import {Storages} from '../constants/storages';
import {IStorageProps, IDataTextHtml} from 'app/types';

export interface IArticlePartTextProps extends IStorageProps {
  data: IDataTextHtml;
}

@inject(Storages.Storage)
@observer
export default class ArticlePartText extends React.Component<
  IArticlePartTextProps
> {
  render() {
    let {data, storage} = this.props;
    const k = storage ? storage.settings.getFontSize() : 1;
    const styleDynamic = {
      fontSize: params.PartFontSize * k,
    };

    return <Text style={[styles.part, styleDynamic]}>{data.content}</Text>;
  }
}

let styles = StyleSheet.create({
  part: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    color: colors.articleText,
  },
});
