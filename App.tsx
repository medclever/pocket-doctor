import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar, YellowBox} from 'react-native';
// import Device from 'react-native-device-detection';
import {observer} from 'mobx-react';
import {Provider} from 'mobx-react/native';
import {NavigationContainer} from '@react-navigation/native';

import colors from './app/constants/colors';
// import {AppTablet} from './app/containers/tablet';
import {AppPhone} from './app/containers/phone';
import {Storages} from './app/constants/storages';
import {appStorageInst} from './app/storages/AppStorage';
import {setNavigator} from './app/components/RootNavigation';

let stores = {
  [Storages.Storage]: appStorageInst,
};

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

@observer
export default class App extends React.Component {
  render() {
    if (!appStorageInst.isInit) {
      return null;
    }
    // let   = Device.isTablet ? <AppTablet /> : <AppPhone />;
    let app = <AppPhone />;
    return (
      <NavigationContainer ref={(ref) => setNavigator(ref as any)}>
        <StatusBar
          backgroundColor={colors.navBlueBackground}
          barStyle="light-content"
        />
        <Provider {...stores}>{app}</Provider>
      </NavigationContainer>
    );
  }
}
