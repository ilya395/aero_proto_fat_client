import React, { useMemo } from "react";
import PageSpinner from "./components/views/PageSpinner/PageSpinner.component";
import AuthContext from "./contexts/Auth/Auth.context";
import useAuth from "./hooks/auth/auth.hook";
import useGlobalLoading from "./hooks/ui/globalLoading/globalLoading.hook";
import MainRouter from "./router/MainRouter/MainRouter.router";
import "./styles/style.scss";

const App = () => {
  // business
  const { isAuth } = useAuth();

  const contextData = useMemo(() => ({
    isAuth,
  }), [isAuth]);

  const { globalLoading }= useGlobalLoading();

  return (
    <>
      <AuthContext.Provider
        value={contextData}
      >
        <MainRouter />
      </AuthContext.Provider>
      <PageSpinner spin={globalLoading} />
    </>
  );
}

export default App;