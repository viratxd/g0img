import { createContext } from "react";

export interface IAuthContext {
    isAuthenticated: boolean;
    email: string;
    userName: string
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: true,
    email: "",
    userName: ""
})