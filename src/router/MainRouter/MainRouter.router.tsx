import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthContext from "../../contexts/Auth/Auth.context";
import { ENavigationKeys } from "../../types/enums/navigation.enum";
import CustomerPage from "../../pages/Customer/Customer.page";
import CustomersPage from "../../pages/Customers/Customers.page";
import LoginPage from "../../pages/Login/Login.page";
import NotFoundPage from "../../pages/NotFound/NotFound.page";
import OrderPage from "../../pages/Order/Order.page";
import OrdersPage from "../../pages/Orders/Orders.page";
import ProductPage from "../../pages/Product/Product.page";
import ProductsPage from "../../pages/Products/Products.page";
import KitsPage from "../../pages/Kits/Kits.page";
import KitPage from "../../pages/Kit/Kit.page";

const MainRouter = () => {
  const context = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path={ENavigationKeys.Kits}
        element={context?.isAuth ? <KitsPage /> : <Navigate to={ENavigationKeys.Login} />}
      />
      <Route
        path={`${ENavigationKeys.Kits}/:id`}
        element={context?.isAuth ? <KitPage /> : <Navigate to={ENavigationKeys.Login} />}
      />
      <Route
        path={`${ENavigationKeys.Kits}/new`}
        element={context?.isAuth ? <KitPage /> : <Navigate to={ENavigationKeys.Login} />}
      />
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
        path={`${ENavigationKeys.Customers}/:id`}
        element={context?.isAuth ? <CustomerPage /> : <Navigate to={ENavigationKeys.Login} />}
      />
      <Route
        path={`${ENavigationKeys.Customers}/new`}
        element={context?.isAuth ? <CustomerPage /> : <Navigate to={ENavigationKeys.Login} />}
      />
      <Route
        path={ENavigationKeys.Products}
        element={context?.isAuth ? <ProductsPage /> : <Navigate to={ENavigationKeys.Login} />}
      />
      <Route
        path={`${ENavigationKeys.Products}/:id`}
        element={context?.isAuth ? <ProductPage /> : <Navigate to={ENavigationKeys.Login} />}
      />
      <Route
        path={`${ENavigationKeys.Products}/new`}
        element={context?.isAuth ? <ProductPage /> : <Navigate to={ENavigationKeys.Login} />}
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
  );
}

export default MainRouter;