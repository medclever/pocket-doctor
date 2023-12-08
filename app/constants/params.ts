import params_local from './params.local';
import _ParamsKey from './params.keys';
export const ParamsKey = _ParamsKey;

let params_all = {
  [ParamsKey.VersionCode]: 129,
  [ParamsKey.VersionName]: '3.10',
  [ParamsKey.ArticleTitleFontSize]: 30,
  [ParamsKey.GroupTitleFontSize]: 25,
  [ParamsKey.MenuTextFontSize]: 20,
  [ParamsKey.PartFontSize]: 23,
  [ParamsKey.GalleryCaptionFontSize]: 24,
  [ParamsKey.BorderArticle]: 2.5,
  [ParamsKey.ArticleDefault]: 31, // Как пользоваться,
  [ParamsKey.MenuItemHeight]: 90,
  [ParamsKey.AppGoogleId]: 'com.teamwizardry.PocketDoctor',
  [ParamsKey.AppAppleStore]: 'id923862582',
  [ParamsKey.LangLocked]: false,
  [ParamsKey.LangLockedId]: 0,
  [ParamsKey.ArticleLocked]: false,
};

export interface IParams {
  ApplicationId: number;
  VersionCode: number;
  VersionName: string;
  ArticleTitleFontSize: number;
  GroupTitleFontSize: number;
  MenuTextFontSize: number;
  PartFontSize: number;
  GalleryCaptionFontSize: number;
  BorderArticle: number;
  ArticleDefault: number;
  AppGoogleId: string;
  AppAppleStore: string;
  LangLocked: boolean;
  LangLockedId: number;
  MenuItemHeight: number;
  ArticleLocked: boolean;
}

export const Params = (Object.assign(
  {},
  params_all,
  params_local,
) as unknown) as IParams;
export default Params;
