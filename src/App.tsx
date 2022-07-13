import React, { useMemo } from "react";
import PageSpinner from "./components/ui/PageSpinner/PageSpinner.component";
import AuthContext from "./contexts/Auth/Auth.context";
import useAuth from "./hooks/auth.hook";
import MainRouter from "./router/MainRouter/MainRouter.router";
import "./styles/style.scss";

const App = () => {
  const { isAuth, loading } = useAuth();
  const contextData = useMemo(() => ({
    isAuth
  }), [isAuth]);
  return (
    <>
      <AuthContext.Provider
        value={contextData}
      >
        <MainRouter />
      </AuthContext.Provider>
      <PageSpinner spin={loading} />
    </>
  );
}

export default App;