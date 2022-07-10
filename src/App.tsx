import React, { useMemo } from "react";
import AuthContext from "./contexts/Auth/Auth.context";
import useAuth from "./hooks/auth.hook";
import MainRouter from "./router/MainRouter/MainRouter.router";
import "./styles/style.scss";

const App = () => {
  const { isAuth } = useAuth();
  const contextData = useMemo(() => ({
    isAuth
  }), [isAuth]);
  return (
    <AuthContext.Provider
      value={contextData}
    >
      <MainRouter />
    </AuthContext.Provider>
  );
}

export default App;