import React, {useState, FC, useCallback, useMemo} from 'react';
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
const GalleryWrapComponent: FC<IGalleryWrapProps> = (props) => {
  const {route, storage} = props;
  const {imageCurrent, images} = route.params;
  if (!storage) {
    return null;
  }
  const [index, setIndex] = useState(0);
  const onChangeImage = (index: number) => {
    setIndex(index);
  };
  const k = storage.settings.getFontSize();
  const image = images[index];
  const imageTitle = (image && image.name) || '';

  const caption = useCallback(() => {
    const styleCaption = {
      fontSize: params.GalleryCaptionFontSize * k,
    };

    return (
      <View style={styles.captionContainer}>
        <Text style={[styles.caption, styleCaption]}>{imageTitle}</Text>
      </View>
    );
  }, [k, imageTitle]);

  const initialPage = useMemo(() => {
    let initialPage = 0;
    for (let i = 0; i < images.length; i++) {
      if (imageCurrent.id === images[i].id) {
        initialPage = i;
      }
    }

    return initialPage;
  }, [imageCurrent.id]);

  const listImages = images.map((image: ImageEntity) => ({
    source: {uri: image.file},
  }));

  return (
    <View style={styles.container}>
      {caption()}
      <Gallery
        style={styles.gallery}
        images={listImages}
        onPageSelected={onChangeImage}
        initialPage={initialPage}
      />
    </View>
  );
};

export default inject(Storages.Storage)(
  observer((props) => <GalleryWrapComponent {...props} />),
);

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
