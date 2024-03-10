import { createContext } from "react";
import { LikedImage } from "../models/LikedImage";
import { IImage } from "../models/IImage";

export interface ILikeImageContext {
    likedImages: LikedImage[];
    add: (newLikedImage: IImage, e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const LikeImageContext = createContext<ILikeImageContext>({
    likedImages: [],
    add: () => {}
});
