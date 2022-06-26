import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ENavigationValues } from "../../enums/navigation.enum";
import CustomersPage from "../../pages/Customers/Customers.page";
import LoginPage from "../../pages/Login/Login.page";
import NotFoundPage from "../../pages/NotFound/NotFound.page";
import OrderPage from "../../pages/Order/Order.page";
import OrdersPage from "../../pages/Orders/Orders.page";
import ProductsPage from "../../pages/Products/Products.page";

const MainRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={ENavigationValues.Orders}
        element={<OrdersPage />}
      >
        <Route
          path=":id"
          element={<OrderPage />}
        />
      </Route>
      <Route
        path={ENavigationValues.Customers}
        element={<CustomersPage />}
      />
      <Route
        path={ENavigationValues.Products}
        element={<ProductsPage />}
      />
      <Route
        path={ENavigationValues.Login}
        element={<LoginPage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  </BrowserRouter>
)

export default MainRouter;