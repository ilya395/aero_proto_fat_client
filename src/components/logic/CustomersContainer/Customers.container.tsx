import React from "react";
import { useSelector } from "react-redux";
import { usersListSelector } from "../../../store/users/reducers/users.reducer";
import CustomersView from "../../ui/CustomersView/Customers.view";

const CustomersContainer = () => {
  const customers = useSelector(usersListSelector) || [];
  return (
    <CustomersView
      customers={customers}
    />
  );
}

export default CustomersContainer;