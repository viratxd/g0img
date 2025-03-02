import { IImage } from "./IImage";

export interface IFavoriteImage {
  _id: string;
  userId: string;
  image: IImage;
}
