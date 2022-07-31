import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { fetchDeleteUser, fetchUsersList } from "../../../store/users/action-creators/users.action-creator";
import { usersListSelector } from "../../../store/users/reducers/users.reducer";
import CustomersView from "../../views/Customers/Customers.view";

const CustomersContainer = () => {
  const dispatch = useAppDispatch();
  const customers = useSelector(usersListSelector) || [];
  const handleDelete = async (id: string) => {
    await dispatch(fetchDeleteUser({
      id,
    }));
    await dispatch(fetchUsersList());
  };
  return (
    <CustomersView
      customers={customers}
      deleteCallback={handleDelete}
    />
  );
}

export default CustomersContainer;