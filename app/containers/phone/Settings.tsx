import React, {Component} from 'react';
import {inject, observer} from 'mobx-react/native';
import {Storages} from '../../constants/storages';
import {Settings} from '../Settings';

@inject(Storages.Storage)
@observer
export class SettingsWrap extends Component {
  render() {
    // TODO[eugen]: change lang
    // headerI18NUpdater(this, this.props.storage.settings.getCurrentLangId());

    return <Settings />;
  }
}
