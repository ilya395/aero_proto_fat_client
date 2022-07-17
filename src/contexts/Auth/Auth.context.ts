import { createContext } from "react";
import { IAuthContext } from "./models/Auth.model";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default AuthContext;