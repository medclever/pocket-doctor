import * as React from 'react';
import {CommonActions} from '@react-navigation/native';
import {Routes} from '../constants/routes';
import autobind from 'autobind-decorator';

export const navigationRef: React.RefObject<any> = React.createRef();

@autobind
class Navigator {
  handlerGoBack?: (route: any) => void;
  navigator?: any;
  handlerDefaultArticle?: () => void;
  routesLength = 0;

  constructor() {}

  setNavigator(ref: React.RefObject<any>) {
    this.navigator = ref;

    if (this.handlerGoBack !== undefined) {
      this.addListener('state', (e: any) => {
        if (e.data?.state?.routes) {
          const length = e.data.state.routes.length;
          if (this.routesLength > length) {
            this.handlerGoBack
              ? this.handlerGoBack(e.data.state.routes[length - 1])
              : false;
          }
          this.routesLength = length;
        }
      });
    }
  }

  navigate(name: string, params: any) {
    this.navigator?.navigate(name, params);
  }

  addListener(name: string, callback: (e: any) => void) {
    this.navigator?.addListener(name, callback);
  }

  setHandlerGoBack(handler: (route: any) => void) {
    this.handlerGoBack = handler;
  }

  setHandlerDefaultArticle(articleId: number) {
    this.handlerDefaultArticle = () =>
      this.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: Routes.Article, params: {id: articleId}}],
        }),
      );
  }

  dispatch(payload: any) {
    this.navigator?.dispatch(payload);
  }

  goBack() {
    this.navigator?.goBack();
  }
}

export const {
  setNavigator,
  navigate,
  addListener,
  dispatch,
  goBack,
  setHandlerGoBack,
  setHandlerDefaultArticle,
} = new Navigator();
