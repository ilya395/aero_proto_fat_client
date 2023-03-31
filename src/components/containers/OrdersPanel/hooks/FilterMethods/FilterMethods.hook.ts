import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAGINATION_LIMIT } from "../../../../../constants/variables.constant";
import { useAppDispatch } from "../../../../../store/hooks/store.hook";
import { IOrder } from "../../../../../store/models/orders.model";
import { fetchOrdersList } from "../../../../../store/orders/action-creators/orders.action-creator";
import { clearOrders, ordersPaginationSelector } from "../../../../../store/orders/reducers/orders.reducer";
import { ordersFilterDataSelector, resetOrdersFilterAction } from "../../../../../store/ordersFilter/reducers/ordersFilter.reducer";
import { ENavigationKeys } from "../../../../../types/enums/navigation.enum";
import { IBaseListRequest } from "../../../../../types/models/base.model";

const useFilterMethods = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const ordersFilter = useSelector(ordersFilterDataSelector);

  const pagination = useSelector(ordersPaginationSelector);

  const filterData: IBaseListRequest<IOrder> = useMemo(() => ({
    filter: ordersFilter || undefined,
    pagination,
  }), [ordersFilter, pagination]);

  const handleCreateNew = useCallback(() => navigate(`${ENavigationKeys.Orders}/new`), [navigate]);

  const handleUpdate = useCallback(async () => {
    await dispatch(clearOrders());
    await dispatch(fetchOrdersList({
      filter: ordersFilter || undefined,
      pagination: {
        lastVisible: null,
        limit: PAGINATION_LIMIT,
      }
    }))
  }, [dispatch, ordersFilter]);

  const handleFilter = useCallback(() => dispatch(fetchOrdersList(filterData)), [dispatch, filterData]);

  const handleResetForm = useCallback(() => dispatch(resetOrdersFilterAction()), [dispatch]);

  return {
    handleCreateNew,
    handleUpdate,
    handleFilter,
    handleResetForm,
  };
}

export default useFilterMethods;
