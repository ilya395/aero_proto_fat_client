import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "../../contexts/Auth/Auth.context";
import { ENavigationKeys } from "../../enums/navigation.enum";
import CustomersPage from "../../pages/Customers/Customers.page";
import LoginPage from "../../pages/Login/Login.page";
import NotFoundPage from "../../pages/NotFound/NotFound.page";
import OrderPage from "../../pages/Order/Order.page";
import OrdersPage from "../../pages/Orders/Orders.page";
import ProductsPage from "../../pages/Products/Products.page";

const MainRouter = () => {
  const context = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ENavigationKeys.Orders}
          element={context?.isAuth ? <OrdersPage /> : <Navigate to={ENavigationKeys.Login} />}
        >
          <Route
            path=":id"
            element={context?.isAuth ? <OrderPage /> : <Navigate to={ENavigationKeys.Login} />}
          />
        </Route>
        <Route
          path={ENavigationKeys.Customers}
          element={context?.isAuth ? <CustomersPage /> : <Navigate to={ENavigationKeys.Login} />}
        />
        <Route
          path={ENavigationKeys.Products}
          element={context?.isAuth ? <ProductsPage /> : <Navigate to={ENavigationKeys.Login} />}
        />
        <Route
          path={ENavigationKeys.Login}
          element={context?.isAuth ? <Navigate to={ENavigationKeys.Orders} /> : <LoginPage />}
        />
        <Route
          path="*"
          element={context?.isAuth ? <NotFoundPage /> : <Navigate to={ENavigationKeys.Login} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter;