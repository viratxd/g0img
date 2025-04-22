import { get } from "./serviceBase";

const API_URL = `${import.meta.env.VITE_APP_API_URL}/api/user/`;

export const fetchUserDataFromDB = async (auth0Id: string) => {
  return await get(API_URL, { auth0Id });
};
