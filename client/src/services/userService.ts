import { post } from "./serviceBase";

const API_URL = `http://localhost:${import.meta.env.VITE_PORT}/api/user/`;

export const createNewUser = async (userName: string, userData: object) => {
  return await post(API_URL + userName, userData)
};