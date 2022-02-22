import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Gallery from 'react-native-image-gallery';
import params from '../constants/params';
import {inject, observer} from 'mobx-react/native';
import {Storages} from '../constants/storages';
import {IStorageProps} from 'app/types';
import ImageEntity from 'app/entity/ImageEntity';

interface IGalleryWrapProps extends IStorageProps {
  route: any;
}
interface IGalleryWrapState {
  index: number;
}

@inject(Storages.Storage)
@observer
export default class GalleryWrap extends React.Component<
  IGalleryWrapProps,
  IGalleryWrapState
> {
  constructor(props: Readonly<IGalleryWrapProps>) {
    super(props);

    this.onChangeImage = this.onChangeImage.bind(this);
  }

  componentWillMount() {
    this.setState({
      index: 0,
    });
  }

  onChangeImage(index: any) {
    this.setState({index});
  }

  render() {
    return (
      <View style={styles.container}>
        {this.caption}
        <Gallery
          style={styles.gallery}
          images={this.listImages}
          onPageSelected={this.onChangeImage}
          initialPage={this.initialPage}
        />
      </View>
    );
  }

  get listImages() {
    const {images} = this.props.route.params;

    return images.map((image: ImageEntity) => {
      return {
        source: {uri: image.file},
      };
    });
  }

  get initialPage() {
    const {imageCurrent, images} = this.props.route.params;

    let initialPage = 0;
    for (let i = 0; i < images.length; i++) {
      if (imageCurrent.id === images[i].id) {
        initialPage = i;
      }
    }

    return initialPage;
  }

  get caption() {
    const {route, storage} = this.props;
    if (!storage) {
      return null;
    }

    const {images} = route.params;
    let image = images[this.state.index];

    let k = storage.settings.getFontSize();
    const styleCaption = {
      fontSize: params.GalleryCaptionFontSize * k,
    };

    return (
      <View style={styles.captionContainer}>
        <Text style={[styles.caption, styleCaption]}>
          {(image && image.name) || ''}
        </Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  gallery: {
    zIndex: 1,
  },
  captionContainer: {
    zIndex: 10,
    position: 'absolute',
    top: 0,
    height: 65,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
  },
  caption: {
    textAlign: 'center',
    color: 'white',
  },
});
