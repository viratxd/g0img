import { IImage } from "../models/IImage";
import { get, post, put } from "./serviceBase";

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

const API_URL = "http://localhost:3000/api/user/";

export const getImagesFromServer = async (userName: string) => {
  const response = await get(API_URL + userName);
  return response.data.favoriteImages;
};

export const createNewUser = async (userName: string, userData: object) => {
  return await post(API_URL + userName, userData)
};

export const saveUpdatedFavorite = async (userName: string, images: IImage[]) => {
  return await put(API_URL + userName, images)
};
