import { IImage } from "../models/IImage";
import { get, post, remove } from "./serviceBase";

export const getImagesFromGoogleSearch = async (
  query: string,
  start: number = 1
) => {
  const response = await get(
    `https://www.googleapis.com/customsearch/v1?key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }&cx=${
      import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID
    }&q=${query}&num=10&searchType=image&start=${start}`
  );
  return response.data;
};

const API_URL = `${import.meta.env.VITE_APP_API_URL}/api/images`;

export const getImagesFromDB = async (userId: string) => {
  const response = await get(API_URL, { userId });
  return response.data;
};

export const addFavoriteImage = async (userId: string, image: IImage) => {
  return await post(API_URL, { userId, image });
};

export const deleteFavoriteImage = async (userId: string, imageId: string) => {
  return await remove(API_URL, { data: { userId, imageId } });
};
