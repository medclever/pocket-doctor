import {observable, action} from 'mobx';
import autobind from 'autobind-decorator';
import {Routes} from '../constants/routes';
import {AppStorage} from './AppStorage';
import {
  dispatch,
  setHandlerGoBack,
  //   goBack,
  //   setHandlerDefaultArticle,
} from '../components/RootNavigation';
// import Device from 'react-native-device-detection';
import ImageEntity from 'app/entity/ImageEntity';
import {CommonActions, StackActions} from '@react-navigation/native';

export interface IRoutePush {
  type?: string;
  routeName?: string;
  params?: any;
}

export interface IRouteState {
  key: string;
  name: string;
  params?: any;
}

@autobind
export class NavigationStorage {
  @observable historyLength = 0;

  constructor(public rootStorage: AppStorage) {}

  async init() {
    setHandlerGoBack(this.handleBack);
    // if (Device.isTablet) {
    //   let defaultId = await this.rootStorage.article.getDefaultId();
    //   setHandlerDefaultArticle(defaultId);
    // }
  }

  hasHistory() {
    return this.historyLength > 0;
  }

  handleBack(route: IRouteState) {
    if (route.name === Routes.Article) {
      this.rootStorage.article.loadById(route.params.id, true);
    }
  }

  @action.bound
  dispatch(payload: IRoutePush) {
    if (payload.routeName) {
      this.historyLength++;

      if (payload.routeName === Routes.Article) {
        let with_scroll = payload.params.with_scroll;
        this.rootStorage.article.loadById(payload.params.id, with_scroll);
        dispatch(StackActions.push(payload.routeName, payload.params));
      } else {
        dispatch(StackActions.push(payload.routeName, payload.params));
      }
    }
  }

  public dispatchArticle(articleId: number, with_scroll = false) {
    this.dispatch({
      routeName: Routes.Article,
      params: {id: Number(articleId), with_scroll},
    });
  }

  public dispatchGallery(imageCurrent: ImageEntity, images: ImageEntity[]) {
    this.dispatch({
      routeName: Routes.Gallery,
      params: {imageCurrent, images},
    });
  }

  public dispatchSettings() {
    this.dispatch({
      routeName: Routes.Settings,
    });
  }

  public dispatchGoBack() {
    this.dispatch(CommonActions.goBack());
  }
}
