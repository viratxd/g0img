import { createContext } from "react";
import { LikedImage } from "../models/LikedImage";
import { IImage } from "../models/IImage";

export interface ILikedImagesContext {
    likedImages: LikedImage[];
    add: (newLikedImage: IImage) => void;
}

export const LikedImagesContext = createContext<ILikedImagesContext>({
    likedImages: [],
    add: () => {}
});
