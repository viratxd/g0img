import { createContext } from "react";

export interface IUserContext {
    id:string;
    userName: string;
    email: string;
    updateUserName?: (newUserName: string) => void;
}

export const UserContext = createContext<IUserContext>({
    id: "",
    userName: "",
    email: "",
    updateUserName: () => {},
})