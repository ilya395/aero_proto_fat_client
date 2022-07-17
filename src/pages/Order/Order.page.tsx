import React from "react";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const {
    pathname,
  } = useLocation();
  console.log(pathname)
  return (<div>Order</div>);
}

export default OrderPage;