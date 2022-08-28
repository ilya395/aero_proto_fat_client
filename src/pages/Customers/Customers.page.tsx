import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CustomerPanel from "../../components/containers/CustomerPanel/CustomerPanel.container";
import CustomersContainer from "../../components/containers/Customers/Customers.container";
import MainLayout from "../../layouts/Main/Main.layout";
import { useAppDispatch } from "../../store/hooks/store.hook";
import { fetchUsersList } from "../../store/users/action-creators/users.action-creator";
import { usersFilterDataSelector } from "../../store/usersFilter/reducers/usersFilter.reducer";

const CustomersPage = () => {
  const dispatch = useAppDispatch();

  // business
  const filterFields = useSelector(usersFilterDataSelector);
  useEffect(() => {
    dispatch(fetchUsersList(filterFields || {}));
  }, []); // первая загрузка

  return (
    <MainLayout>
      <CustomerPanel />
      <CustomersContainer />
    </MainLayout>
  );
}

export default CustomersPage;