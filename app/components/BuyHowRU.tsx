import React, {Component} from 'react';
import {Linking, ScrollView} from 'react-native';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Button} from 'react-native';
import AppLink from 'react-native-app-link';
import params from '../constants/params';
import ArticleEntity from '../entity/ArticleEntity';
import {i18n, i18n_keys} from '../constants/i18n';

export class BuyHowRU extends Component {
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

  howBuyYouTube() {
    let url = 'https://www.youtube.com/watch?v=bJAouaAKF3I';
    Linking.openURL(url).catch((err) =>
      console.error('An error occurred', err),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.howBuyContainer}>
          <Text style={styles.howBuyTitle}>Как оплатить:</Text>

          <View style={styles.howBuyItemContainer}>
            <Text style={styles.howBuyItem}>
              - Со счета мобильного телефона (самый простой способ).
            </Text>
            <View style={styles.btnWrap}>
              <Button
                style={styles.howBuyYouTubeBtn}
                onPress={this.howBuyYouTube}
                title="Видео инструкция"
              />
            </View>
          </View>

          <View style={styles.howBuyItemContainer}>
            <Text style={styles.howBuyItem}>- Пластиковой картой</Text>
            <View style={styles.howBuyItem2Container}>
              <Text style={styles.howBuyItem2}>
                - Перейдите на страницу с приложением.
              </Text>
              <View style={styles.btnWrap}>
                <Button
                  style={styles.pageAppBtn}
                  onPress={this.onAppPage}
                  title="Страница приложения"
                />
              </View>
              <Text style={styles.howBuyItem2}>
                - Нажмите на кнопку со стоимостью приложения.
              </Text>
              <Text style={styles.howBuyItem2}>
                - Соглашаемся с необходимыми разрешениями для работы приложения.
              </Text>
              <Text style={styles.howBuyItem2}>
                - Нажимаем кнопку "Принять".
              </Text>
              <Text style={styles.howBuyItem2}>
                Далее при указании способа оплаты нажмите на "Добавить кредитную
                или дебетовую карту".
              </Text>
              <Text style={styles.howBuyItem2}>
                Заполните необходимые поля.
              </Text>
              <Text style={styles.howBuyItem2}>
                Все! Вы можете купить приложение.
              </Text>
            </View>
          </View>
          <View style={styles.howBuyItemContainer}>
            <Text style={styles.howBuyItem}>
              - Вирутальной картой (если не хотите оставлять данные реальной
              карты)
            </Text>
            <View style={styles.howBuyItem2Container}>
              <Text style={styles.howBuyItem2}>
                - Данную услугу предоставляют многие онлайн банки, некоторые из
                них: Yandex деньги, Qiwi
              </Text>
              <Text style={styles.howBuyItem2}>
                - После создания виртуальной карты, воспользуйтесь инструкцией
                для оплаты "Пластиковой картой"
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  toStore: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  howBuyContainer: {
    marginTop: 30,
  },
  howBuyTitle: {
    fontSize: 30,
    color: '#333',
  },
  howBuyItemContainer: {
    marginBottom: 20,
  },
  howBuyItem: {
    fontSize: 25,
    color: '#333',
  },
  howBuyItem2Container: {
    marginTop: 15,
  },
  howBuyItem2: {
    fontSize: 19,
    color: '#333',
    paddingLeft: 15,
  },
  howBuyYouTubeBtn: {
    marginTop: 20,
  },
  btnWrap: {
    marginVertical: 15,
  },
});
