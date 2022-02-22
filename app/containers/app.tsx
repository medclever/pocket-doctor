import React from 'react';
import {View} from 'react-native';
// import Device from 'react-native-device-detection';
// import {AppTablet} from './tablet';
import {AppPhone} from './phone';
import {Provider} from 'mobx-react/native';
import {Storages} from '../constants/storages';
import {appStorageInst} from '../storages/AppStorage';
import {observer} from 'mobx-react';

let stores = {
  [Storages.Storage]: appStorageInst,
};

@observer
export default class App extends React.Component {
  render() {
    if (!appStorageInst.isInit) return <View />;

    // TODO:[cleverid] Tablet version
    // let app = Device.isTablet ? <AppTablet /> : <AppPhone />;
    let app = <AppPhone />;

    return <Provider {...stores}>{app}</Provider>;
  }
}
