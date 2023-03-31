import React, { useEffect } from "react";
import MainLayout from "../../layouts/Main/Main.layout";
import OrdersPanel from "../../components/containers/OrdersPanel/OrdersPanel.container";
import OrdersContainer from "../../components/containers/Orders/Orders.container";
import { useAppDispatch } from "../../store/hooks/store.hook";
import useFilterMethods from "../../components/containers/OrdersPanel/hooks/FilterMethods/FilterMethods.hook";
import { clearOrders } from "../../store/orders/reducers/orders.reducer";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { handleUpdate } = useFilterMethods();
  useEffect(() => {
    handleUpdate();
    return () => {
      dispatch(clearOrders());
    };
  }, []);
  return (
    <MainLayout>
      <OrdersContainer />
      <OrdersPanel />
    </MainLayout>
  );
}

export default OrdersPage;