import React, {Component} from 'react';
import {Linking, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Button} from 'react-native';
import AppLink from 'react-native-app-link';
import params from '../constants/params';
import ArticleEntity from '../entity/ArticleEntity';
import {i18n, i18n_keys} from '../constants/i18n';
import {inject, observer} from 'mobx-react/native';
import {Storages} from '../constants/storages';
import {BuyHowRU} from './BuyHowRU';

@inject(Storages.Storage)
@observer
class Buy extends Component {
  static propTypes = {
    article: PropTypes.instanceOf(ArticleEntity).isRequired,
  };

  constructor(props) {
    super(props);
  }

  onAppPage() {
    const appStoreId = params.AppAppleStore,
      playStoreId = params.AppGoogleId;

    AppLink.openInStore(appStoreId, playStoreId)
      .then(() => {})
      .catch((err) => {
        // handle error
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.neddedBuyContainer}>
            <Text style={styles.message}>
              {i18n.t(i18n_keys.BUY_TITLE, {title: this.props.article.title})}
            </Text>
            <Button
              style={styles.toStore}
              onPress={this.onAppPage}
              title={i18n.t(i18n_keys.BUY_ACTION)}
              color="#f0c400"
            />
          </View>
          {this.props.storage.settings.getCurrentLangId() == 1 ? (
            <BuyHowRU />
          ) : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  neddedBuyContainer: {},
  message: {
    color: '#333',
    fontSize: 30,
    paddingBottom: 20,
  },
});

export default Buy;
