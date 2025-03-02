import { IImage } from "../models/IImage";
import { get, post, remove } from "./serviceBase";

export const getImagesFromGoogleSearch = async (searchWord: string) => {
  const response = await get(
    `https://www.googleapis.com/customsearch/v1?key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }&cx=${
      import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID
    }&q=${searchWord}&num=10&searchType=image`
  );
  return response.data;
};

const API_URL = `${import.meta.env.VITE_APP_API_URL}/api/images/`;

export const getImagesFromDB = async (userName: string) => {
  const response = await get(API_URL + userName);
  return response.data;
};

export const addFavoriteImage = async (userName: string, image: IImage) => {
  return await post(API_URL + userName, image);
};

export const deleteFavoriteImage = async (
  userName: string,
  imageId: string
) => {
  return await remove(API_URL + userName, { imageId });
};
