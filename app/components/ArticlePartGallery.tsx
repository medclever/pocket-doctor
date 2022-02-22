import React from 'react';
import {View, Image, StyleSheet, TouchableHighlight} from 'react-native';
import colors from '../constants/colors';
import {IDataGallery, IArticleOnImageClick} from 'app/types';

export interface IArticlePartGallery {
  data: IDataGallery;
  onImageClick: IArticleOnImageClick;
}

export default class ArticlePartGallery extends React.Component<
  IArticlePartGallery
> {
  static defaultProps = {
    onImageClick: () => {},
  };

  render() {
    let {data} = this.props;

    return (
      <View style={styles.container}>
        {data.images &&
          data.images.map((image) => {
            let itemHeight = 120;

            const {width = 1, height = 1} = image;
            let styleItem = {
              width: Math.round(width * (itemHeight / height)),
              height: itemHeight,
            };

            return (
              <View style={styles.item_thumb_wrapper} key={image.id}>
                <TouchableHighlight
                  onPress={() => {
                    this.props.onImageClick(image, data.images || []);
                  }}>
                  <View style={styles.item_thumb_container}>
                    <Image
                      style={[styles.item_thumb, styleItem]}
                      resizeMode="contain"
                      source={{uri: image.file}}
                    />
                    <Image
                      style={styles.icon_zoom_in}
                      source={require('./../images/icon_zoom_in.png')}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            );
          })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  item_thumb_wrapper: {
    marginRight: 10,
    marginBottom: 10,
  },
  item_thumb_container: {
    borderWidth: 1,
    borderColor: colors.articleImageBorder,
  },
  item_thumb: {
    height: 120,
  },
  icon_zoom_in: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    opacity: 0.5,
  },
});
