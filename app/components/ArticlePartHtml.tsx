import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import HTMLView from 'react-native-htmlview';
import params from '../constants/params';
import colors from '../constants/colors';
import {inject, observer} from 'mobx-react/native';
import {Storages} from '../constants/storages';
import {IStorageProps, IDataTextHtml, IArticleOnLinkClick} from 'app/types';

export interface IArticlePartHtmlProps extends IStorageProps {
  data: IDataTextHtml;
  onLinkClick: IArticleOnLinkClick;
}

@inject(Storages.Storage)
@observer
export default class ArticlePartHtml extends React.Component<
  IArticlePartHtmlProps
> {
  static defaultProps = {
    onLinkClick: () => {},
  };

  renderNode(
    node: any,
    index: any,
    siblings: any,
    parent: any,
    defaultRenderer: any,
  ) {
    if (node.name === 'b2') {
      return <Text key={index}>{defaultRenderer(node.children, parent)}</Text>;
    }
  }
  render() {
    let {data, storage, onLinkClick} = this.props;
    const k = storage ? storage.settings.getFontSize() : 1;
    const stylesHtml = StyleSheet.create({
      div: {
        fontSize: params.PartFontSize * k,
        color: colors.articleText,
      },
    });

    return (
      <View style={styles.part}>
        <HTMLView
          value={data.content}
          renderNode={this.renderNode}
          lineBrake={null}
          addLineBreaks={null}
          stylesheet={stylesHtml}
          onLinkPress={(url: any) => {
            let articleId = url.match(/\/article\/(\d+)/)[1];
            onLinkClick(articleId);
          }}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  part: {
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
});
