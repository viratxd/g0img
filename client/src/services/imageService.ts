import { get } from "./serviceBase";

export const getImages = async (searchWord: string) => {
  const response = await get(
    `https://www.googleapis.com/customsearch/v1?key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }&cx=${
      import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID
    }&q=${searchWord}&num=10&searchType=image`
  );

  return response.data;
};
