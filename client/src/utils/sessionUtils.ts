
import { ISessionData } from "../models/ISessionData";

export const loadSessionData = (): ISessionData => {
  const data = sessionStorage.getItem("ImageSearchData");
  if (!data) {
    return {
      searchWord: "",
      images: [],
      searchTime: "",
      correctedQuery: "",
      page: 1,
    };
  }
  return JSON.parse(data);
};

export const saveSessionData = (data: ISessionData) => {
  const payload = {
    searchWord: data.searchWord,
    images: data.images,
    searchTime: data.searchTime,
    correctedQuery: data.correctedQuery,
    page: data.page,
  };
  sessionStorage.setItem("ImageSearchData", JSON.stringify(payload));
};
