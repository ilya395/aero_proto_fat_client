import { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../store/hooks/store.hook";
import { fetchDeleteKit } from "../../../../store/kits/action-creators/kits.action-creator";
import { IOrdersFilter } from "../../../../store/models/orders.model";
import { fetchNextOrdersList, fetchOrdersList } from "../../../../store/orders/action-creators/orders.action-creator";
import { ordersListSelector, ordersPaginationSelector } from "../../../../store/orders/reducers/orders.reducer";
import { ordersFilterDataSelector } from "../../../../store/ordersFilter/reducers/ordersFilter.reducer";
import { IBaseListRequest } from "../../../../types/models/base.model";

const useOrders = () => {
  const dispatch = useAppDispatch();

  const orders = useSelector(ordersListSelector) || [];

  // business
  const filterFields = useSelector(ordersFilterDataSelector);
  const pagination = useSelector(ordersPaginationSelector);
  const filterData: IBaseListRequest<IOrdersFilter> = useMemo(() => ({
    filter: filterFields || {},
    pagination,
  }), [filterFields, pagination]);
  const fetchOrders = useCallback(() => dispatch(fetchOrdersList(filterData)), [dispatch, filterData]);
  const fetchNextOrders = useCallback(() => dispatch(fetchNextOrdersList(filterData)), [dispatch, filterData]);
  const handleDelete = useCallback(async (id: string) => {
    await dispatch(fetchDeleteKit({
      id,
    }));
    await fetchOrders();
  }, [dispatch, fetchOrders]);

  return {
    orders,
    handleDelete,
    fetchOrders,
    fetchNextOrders,
  };
}

export default useOrders;