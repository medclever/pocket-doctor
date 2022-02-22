import {AppStorage} from '../storages/AppStorage';
import ImageEntity from 'app/entity/ImageEntity';

export interface IStorageProps {
  storage?: AppStorage;
}

export interface IArticlePartRoot {
  parts?: IArticlePart[];
}
export interface IArticlePartGroup {
  title: IArticlePartsGroupTitle;
  group: IArticlePartsGroupGroup;
  parts?: IArticlePart[];
}
export interface IArticlePartsGroupTitle {
  color: string;
  colorBorder: string;
  text?: string;
}
export interface IArticlePartsGroupGroup {
  colorBorder: string;
  backgroundColor: string;
}

export interface IArticlePart {
  type: IPartType;
  data: IDataAll;
}
export type IDataAll = IDataRoot | IDataGallery | IDataTextHtml | IDataGroup;
export type IPartType = 'group' | 'text' | 'html' | 'gallery';
export interface IDataRoot {
  parts?: IArticlePart[];
}
export interface IDataGallery {
  images?: ImageEntity[];
}
export interface IDataTextHtml {
  content?: string;
}
export interface IDataGroup {
  title: IArticlePartsGroupTitle;
  group: IArticlePartsGroupGroup;
  parts?: IArticlePart[];
}

export type IArticleOnLinkClick = (articleId: number) => void;
export type IArticleOnImageClick = (
  imageCurrent: ImageEntity,
  images: ImageEntity[],
) => void;
