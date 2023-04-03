import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import CustomerPanel from "../../components/containers/CustomersPanel/CustomersPanel.container";
import CustomersContainer from "../../components/containers/Customers/Customers.container";
import MainLayout from "../../layouts/Main/Main.layout";
import { useAppDispatch } from "../../store/hooks/store.hook";
import { clearUsers } from "../../store/users/reducers/users.reducer";
import { usersFilterDataSelector } from "../../store/usersFilter/reducers/usersFilter.reducer";
import { PAGINATION_LIMIT } from "../../constants/variables.constant";
import { updateUsersList } from "../../store/users/action-creators/users.action-creator";

const CustomersPage = () => {
  const dispatch = useAppDispatch();
  // TODO: double...
  const usersFilter = useSelector(usersFilterDataSelector);
  const handleUpdate = useCallback(async () => {
    await dispatch(clearUsers());
    await dispatch(updateUsersList({
      filter: usersFilter || undefined,
      pagination: {
        lastVisible: null,
        limit: PAGINATION_LIMIT,
      }
    }))
  }, [dispatch, usersFilter]);
  useEffect(() => {
    handleUpdate();
    return () => {
      dispatch(clearUsers());
    };
  }, []);
  return (
    <MainLayout>
      <CustomerPanel />
      <CustomersContainer />
    </MainLayout>
  );
}

export default CustomersPage;