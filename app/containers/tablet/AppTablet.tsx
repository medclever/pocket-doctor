import React, {Component} from 'react';
import autobind from 'autobind-decorator';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
// import {addNavigationHelpers} from 'react-navigation';
import {inject, observer} from 'mobx-react/native';
// import {Navigate} from './navigate';
import {Storages} from '../../constants/storages';
import {IStorageProps} from '../../types';
import {i18n, i18n_keys} from '../../constants/i18n';
import colors from '../../constants/colors';
import Menu from '../../components/menu';
import {HeaderButtonSettings} from '../../components/HeaderButtonSettings';

import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from '../../constants/routes';
import {ArticleOrBuyTablet} from './Article';
import {GalleryWrapTablet} from './Gallery';
import {SettingsWrapTablet} from './Settings';
import {navigationRef} from '../../components/RootNavigation';

const Stack = createStackNavigator();

export interface IAppTabletProps extends IStorageProps {
  navigation: any;
}

@inject(Storages.Storage)
@observer
@autobind
export class AppTablet extends Component<IAppTabletProps> {
  constructor(props: Readonly<IAppTabletProps>) {
    super(props);
  }

  /**
   * @param {number} articleId
   */
  handleMenuItemSelect(articleId: number) {
    if (this.props.storage?.article.getTargetId() === articleId) {
      return;
    }
    this.props.storage?.navigation.dispatchArticle(articleId);
  }

  render() {
    const {storage} = this.props;
    if (!storage || !storage.settings.loaded) {
      return null;
    }

    let menuList = storage.menu.items;

    return (
      <View style={styles.screen}>
        <View style={styles.master}>
          <View style={styles.masterToolbarMenuContainer}>
            <Text style={styles.masterToolbarMenu}>
              {i18n.t(i18n_keys.MENU_TITLE)}
            </Text>
          </View>
          <ScrollView ref={view => storage.menu.setMenuScrollView(view)}>
            <Menu
              items={menuList}
              onItemClick={article => this.handleMenuItemSelect(article.id)}
              onItemActive={item => item.id === storage.article.getTargetId()}
            />
          </ScrollView>
        </View>

        <View style={styles.detail}>
          <View style={styles.detailToolbar}>
            {storage.navigation.hasHistory() ? (
              <>
                <TouchableHighlight
                  onPress={() => storage.navigation.dispatchGoBack()}
                  style={styles.backButton}
                  underlayColor={colors.buttonHighlightsWhite}>
                  <Text>Назад</Text>
                </TouchableHighlight>
                <Text>{storage.navigation.historyLength}</Text>
              </>
            ) : (
              <View />
            )}
            <HeaderButtonSettings
              // style={styles.detailToolbarSettings}
              onPress={() => storage.navigation.dispatchSettings()}
            />
          </View>
          <View style={styles.detailBody}>
            <Stack.Navigator headerMode="none">
              <Stack.Screen
                name={Routes.Article}
                component={ArticleOrBuyTablet}
              />
              <Stack.Screen
                name={Routes.Gallery}
                component={GalleryWrapTablet}
              />
              <Stack.Screen
                name={Routes.Settings}
                component={SettingsWrapTablet}
              />
            </Stack.Navigator>
          </View>
        </View>
      </View>
    );
  }
}

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;
let height = Math.min(screenWidth, screenHeight);

var styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  master: {
    flex: 1,
    borderColor: colors.borderColorToolbar,
    borderRightWidth: 1,
    // width: width * 0.3
  },
  masterToolbarMenuContainer: {
    height: 60,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: colors.navBlueBackground,
    borderColor: colors.borderColorToolbar,
    borderBottomWidth: 1,
  },
  masterToolbarMenu: {
    fontSize: 23,
    alignItems: 'center',
    textAlign: 'center',
    color: colors.navText,
    fontWeight: 'bold',
  },

  detail: {
    flex: 2,
    height: height,
    backgroundColor: 'white',
  },
  detailToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    padding: 5,
    backgroundColor: colors.navBlueBackground,
    borderColor: colors.borderColorToolbar,
    borderBottomWidth: 1,
  },
  backButton: {
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 18,
    paddingTop: 2,
  },
  detailToolbarSettings: {
    margin: 0,
  },
  detailBody: {
    flex: 1,
  },
});
