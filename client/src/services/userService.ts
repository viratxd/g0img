import { post } from "./serviceBase";

const API_URL = `${import.meta.env.VITE_APP_API_URL}/api/user/`;

export const createNewUser = async (userName: string, userData: object) => {
  return await post(API_URL + userName, userData)
};