import { createContext } from "react";

export interface IAuthContext {
    isAuthenticated: boolean;
    userIdWithGoogle: string;
    userIdWithGithub: string;
    userName: string
}

export const AuthContext = createContext<IAuthContext>({
    isAuthenticated: true,
    userIdWithGoogle: "",
    userIdWithGithub: "",
    userName: ""
})