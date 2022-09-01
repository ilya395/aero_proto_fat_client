import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { IUsersRequest } from "../../../store/models/users.model";
import { fetchDeleteUser, fetchUsersList } from "../../../store/users/action-creators/users.action-creator";
import { usersListSelector, usersPaginationSelector } from "../../../store/users/reducers/users.reducer";
import { usersFilterDataSelector } from "../../../store/usersFilter/reducers/usersFilter.reducer";
import CustomersView from "../../views/Customers/Customers.view";

const CustomersContainer = () => {
  const dispatch = useAppDispatch();
  const customers = useSelector(usersListSelector) || [];

  // business
  const filterFields = useSelector(usersFilterDataSelector);
  const lastVisible = useSelector(usersPaginationSelector);
  const filterData: IUsersRequest = useMemo(() => ({
    filter: filterFields || undefined,
    pagination: {
      lastVisible,
    }
  }), [filterFields, lastVisible]);
  const handleDelete = useCallback(async (id: string) => {
    await dispatch(fetchDeleteUser({
      id,
    }));
    await dispatch(fetchUsersList(filterData));
  }, [dispatch, filterData]);

  if (!customers.length) {
    return (
      <div>
        Нету...
      </div>
    );
  }

  return (
    <CustomersView
      customers={customers}
      deleteCallback={handleDelete}
    />
  );
}

export default CustomersContainer;