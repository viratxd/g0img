import { createContext } from "react";

export interface IAuthContext {
    isAuthenticated: boolean;
    userId: string;
    userName: string
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: true,
    userId: "",
    userName: ""
})