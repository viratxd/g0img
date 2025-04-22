import { createContext } from "react";

export interface IAuth0Context {
    isAuthenticated: boolean;
    email: string;
}

export const Auth0Context = createContext<IAuth0Context>({
    isAuthenticated: true,
    email: "",
})