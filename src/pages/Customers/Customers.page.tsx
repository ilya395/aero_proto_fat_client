import React, { useEffect } from "react";
import CustomerPanel from "../../components/containers/CustomerPanel/CustomerPanel.container";
import CustomersContainer from "../../components/containers/Customers/Customers.container";
import MainLayout from "../../layouts/Main/Main.layout";
import { useAppDispatch } from "../../store/hooks/store.hook";
import { fetchUsersList } from "../../store/users/action-creators/users.action-creator";

const CustomersPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);
  return (
    <MainLayout>
      <CustomerPanel />
      <CustomersContainer />
    </MainLayout>
  );
}

export default CustomersPage;