import React, {Component} from 'react';
import {inject, observer} from 'mobx-react/native';
import {ScrollView} from 'react-native';
import {Storages} from '../../constants/storages';
import Menu from '../../components/menu';
import {IStorageProps} from 'app/types';
import {HeaderButtonSettings} from '../../components/HeaderButtonSettings';
import {headerI18NUpdater} from '../../helper/headerI18NUpdater';
import {Routes} from '../../constants/routes';
import {i18n, i18n_keys} from '../../constants/i18n';
import {AppStorage} from 'app/storages/AppStorage';
import ArticleEntity from 'app/entity/ArticleEntity';

@inject(Storages.Storage)
@observer
export class MenuWrap extends Component<IStorageProps> {
  // static navigationOptions = ({ screenProps, navigation }) => {
  //   return {
  //     title: i18n.t(i18n_keys.MENU_TITLE),
  //     headerRight: (
  //       <HeaderButtonSettings
  //         onPress={() => navigation.navigate(Routes.Settings)}
  //       />
  //     )
  //   };
  // };

  render() {
    let {storage} = this.props;
    if (!storage) return null;

    let storageMenu = storage.menu;
    const handleNavigation = (article: ArticleEntity) => {
      storage?.navigation.dispatchArticle(article.id, false);
    };
    // let storageSettings = storage.settings;
    // headerI18NUpdater(this, storageSettings.getCurrentLangId());

    return (
      <ScrollView>
        <Menu items={storageMenu.items} onItemClick={handleNavigation} />
      </ScrollView>
    );
  }
}
