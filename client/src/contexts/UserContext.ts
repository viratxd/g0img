import { createContext } from "react";

export interface IUserContext {
    userName: string;
    email: string;
}

export const UserContext = createContext<IUserContext>({
    userName: "",
    email: "",
})