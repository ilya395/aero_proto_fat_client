import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import PageSpinner from "./components/views/PageSpinner/PageSpinner.component";
import AuthContext from "./contexts/Auth/Auth.context";
import useAuth from "./hooks/auth/auth.hook";
import MainRouter from "./router/MainRouter/MainRouter.router";
import { productAwaitSelector } from "./store/product/reducers/product.reducer";
import { productsAwaitSelector } from "./store/products/reducers/products.reducer";
import { userAwaitSelector } from "./store/user/reducers/user.reducer";
import { usersAwaitSelector } from "./store/users/reducers/users.reducer";
import "./styles/style.scss";

const App = () => {
  // business
  const { isAuth, loading,} = useAuth();
  const usersAwait = useSelector(usersAwaitSelector);
  const userAwait = useSelector(userAwaitSelector);
  const productsAwait = useSelector(productsAwaitSelector);
  const productAwait = useSelector(productAwaitSelector);
  const contextData = useMemo(() => ({
    isAuth,
  }), [isAuth]);

  const globalLoading = useMemo(() =>
    loading
    || usersAwait
    || userAwait
    || productsAwait
    || productAwait,
  [loading, productAwait, productsAwait, userAwait, usersAwait]);

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