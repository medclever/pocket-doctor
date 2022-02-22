import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {Storages} from '../constants/storages';
import {inject, observer} from 'mobx-react/native';
import colors from '../constants/colors';
import {i18n, i18n_keys} from '../constants/i18n';
import {Params, ParamsKey} from '../constants/params';
import {IStorageProps} from 'app/types';

export interface ISettingsProps extends IStorageProps {}

@inject(Storages.Storage)
@observer
export class Settings extends Component<ISettingsProps> {
  constructor(props: Readonly<ISettingsProps>) {
    super(props);

    this.state = {
      items: [],
    };
  }

  render() {
    const {storage} = this.props;
    if (!storage) {
      return null;
    }

    let storageSettings = storage.settings;

    return (
      <ScrollView>
        <View style={styles.container}>
          {!Params.LangLocked && (
            <View style={styles.languageContainer}>
              <Text style={styles.label}>
                {i18n.t(i18n_keys.SETTINGS_LANGUAGE_SELECT)}:
              </Text>
            </View>
          )}
        </View>

        <TouchableHighlight
          style={styles.clearButtonContainer}
          underlayColor={colors.touchableHighligts}
          onPress={() => {
            storageSettings.clear();
          }}>
          <Text style={styles.clearButton}>
            {i18n.t(i18n_keys.SETTINGS_CLEAR)}
          </Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  label: {
    margin: 14,
    marginBottom: 20,
    fontSize: 20,
    color: colors.navBlueBackground,
    fontWeight: 'bold',
  },
  slider: {
    marginBottom: 20,
  },
  fontContainer: {
    backgroundColor: 'white',
  },
  languageContainer: {},
  languagePicker: {
    marginTop: -10,
    marginLeft: 6,
    marginRight: 6,
  },
  exampleContainer: {},
  clearButtonContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  clearButton: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    color: colors.navBlueBackground,
    borderColor: colors.navBlueBackground,
  },
});
