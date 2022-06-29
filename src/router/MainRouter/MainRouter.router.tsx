import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ENavigationKeys } from "../../enums/navigation.enum";
import useAuth from "../../hooks/auth.hook";
import CustomersPage from "../../pages/Customers/Customers.page";
import LoginPage from "../../pages/Login/Login.page";
import NotFoundPage from "../../pages/NotFound/NotFound.page";
import OrdersPage from "../../pages/Orders/Orders.page";
import ProductsPage from "../../pages/Products/Products.page";

const MainRouter = () => {
  const { isAuth } = useAuth();
  console.log(isAuth)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ENavigationKeys.Orders}
          element={isAuth ? <OrdersPage /> : <Navigate replace to={ENavigationKeys.Login} />}
        >
          <Route
            path=":id"
            element={isAuth ? <OrdersPage /> : <Navigate replace to={ENavigationKeys.Login} />}
          />
        </Route>
        <Route
          path={ENavigationKeys.Customers}
          element={isAuth ? <CustomersPage /> : <Navigate replace to={ENavigationKeys.Login} />}
        />
        <Route
          path={ENavigationKeys.Products}
          element={isAuth ? <ProductsPage /> : <Navigate replace to={ENavigationKeys.Login} />}
        />
        <Route
          path={ENavigationKeys.Login}
          element={isAuth ? <Navigate replace to={ENavigationKeys.Orders} /> : <LoginPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter;