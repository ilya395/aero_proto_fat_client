import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import CustomerPanel from "../../components/containers/CustomerPanel/CustomerPanel.container";
import CustomersContainer from "../../components/containers/Customers/Customers.container";
import MainLayout from "../../layouts/Main/Main.layout";
import { useAppDispatch } from "../../store/hooks/store.hook";
import { IUsersRequest } from "../../store/models/users.model";
import { fetchUsersList } from "../../store/users/action-creators/users.action-creator";
import { usersPaginationSelector } from "../../store/users/reducers/users.reducer";
import { usersFilterDataSelector } from "../../store/usersFilter/reducers/usersFilter.reducer";

const CustomersPage = () => {
  const dispatch = useAppDispatch();

  // business
  const filterFields = useSelector(usersFilterDataSelector);
  const lastVisible = useSelector(usersPaginationSelector);
  const filterData: IUsersRequest = useMemo(() => ({
    filter: filterFields || undefined,
    pagination: {
      lastVisible,
    }
  }), [filterFields, lastVisible]);
  useEffect(() => {
    dispatch(fetchUsersList(filterData));
  }, []); // первая загрузка

  return (
    <MainLayout>
      <CustomerPanel />
      <CustomersContainer />
    </MainLayout>
  );
}

export default CustomersPage;