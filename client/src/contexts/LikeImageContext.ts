import { createContext } from "react";
import { IImage } from "../models/IImage";
import { IFavoriteImage } from "../models/IFavoriteImage";

export interface ILikeImageContext {
  likedImages: IFavoriteImage[];
  add: (newLikedImage: IImage) => void;
  remove: (removedImage: string) => void;
}

export const LikeImageContext = createContext<ILikeImageContext>({
  likedImages: [],
  add: () => {},
  remove: () => {},
});
