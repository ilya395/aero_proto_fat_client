import { createContext } from "react";

const AuthContext = createContext<{ isAuth?: boolean; } | null>(null);

export default AuthContext;