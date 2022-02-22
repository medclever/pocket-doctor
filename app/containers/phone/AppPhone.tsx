import React, {Component} from 'react';
import {MenuWrap} from './Menu';
import {inject, observer} from 'mobx-react/native';
import {Storages} from '../../constants/storages';

import GalleryWrap from '../../components/GalleryWrap';
import colors from '../../constants/colors';
import {createStackNavigator} from '@react-navigation/stack';
import {ArticleWrap} from './Article';
import {Routes} from '../../constants/routes';
import {i18n, i18n_keys} from '../../constants/i18n';
import {HeaderButtonSettings} from '../../components/HeaderButtonSettings';
import {IStorageProps} from 'app/types';
import {navigate} from '../../components/RootNavigation';
import {Settings} from '../Settings';
import {View} from 'react-native';

const Stack = createStackNavigator();

export interface IAppPhoneProps extends IStorageProps {}

@inject(Storages.Storage)
@observer
export class AppPhone extends Component<IAppPhoneProps> {
  render() {
    if (!this.props.storage || !this.props.storage.settings.loaded) {
      return null;
    }

    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.navBlueBackground,
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name={Routes.Home}
          component={MenuWrap}
          options={_ => ({title: i18n.t(i18n_keys.MENU_TITLE)})}
        />
        <Stack.Screen
          name={Routes.Article}
          component={ArticleWrap}
          options={{
            title: '',
          }}
        />
        <Stack.Screen
          name={Routes.Gallery}
          component={GalleryWrap}
          options={{
            title: '',
            headerRight: () => null,
          }}
        />
        <Stack.Screen
          name={Routes.Settings}
          component={Settings}
          options={_ => ({
            title: i18n.t(i18n_keys.SETTINGS_TITLE),
            headerRight: () => null,
          })}
        />
      </Stack.Navigator>
    );
  }
}
