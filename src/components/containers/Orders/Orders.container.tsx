import React from "react";
import useInfiniteScroll from "../../../hooks/infiniteScroll/infiniteScroll.hook";
import { IOrder } from "../../../store/models/orders.model";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import BaseCard from "../../ui/BaseCard/BaseCard.ui";
import BaseList from "../../ui/BaseList/BaseList.ui";
import useOrders from "./hooks/Orders.hook";

const OrdersContainer = () => {
  const { orders, handleDelete, fetchOrders } = useOrders();

  const {
    setLastElement,
  } = useInfiniteScroll({
    dataLength: orders.length,
    callback: fetchOrders,
  });

  if (!orders.length) {
    return (
      <div>
        Нету...
      </div>
    );
  }

  return (
    <BaseList
      items={orders}
      deleteCallback={handleDelete}
      callbackRefToLastElement={setLastElement}
      path={ENavigationKeys.Orders}
      renderCard={(item: IOrder) => <BaseCard {...item} title={item.id} subTitle={item.price} />}
    />
  );
}

export default OrdersContainer;
