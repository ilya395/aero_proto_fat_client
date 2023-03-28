import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PAGINATION_LIMIT } from "../../../constants/variables.constant";
import { IBaseListResponse } from "../../../types/models/base.model";
import { IOrder, IOrdersError } from "../../models/orders.model";
import { RootState } from "../../root.reducer";
import { fetchDeleteOrder, fetchOrdersList } from "../action-creators/orders.action-creator";
import { IOrdersState } from "../models/orders.model";

const initialOrdersState: IOrdersState = {
  await: false,
  error: null,
  ordersList: null,
  pagination: {
    lastVisible: null,
    limit: PAGINATION_LIMIT,
  }
}

export const OrdersSlice = createSlice({
  name: "orders",
  initialState: initialOrdersState,
  reducers: {
    clearOrders(state) {
      // eslint-disable-next-line no-param-reassign
      state = initialOrdersState;
    },
    clearOrdersPagination(state) {
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = null;
    },
    changeOrdersLimit(state, action: PayloadAction<number>) {
      // eslint-disable-next-line no-param-reassign
      state.pagination.limit = action.payload;
    },
  },
  extraReducers: {
    [fetchOrdersList.fulfilled.type]: (state, action: PayloadAction<IBaseListResponse<IOrder>>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.ordersList = action.payload.response || [];
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = action.payload.lastVisible || null;
    },
    [fetchOrdersList.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [fetchOrdersList.rejected.type]: (state, action: PayloadAction<IOrdersError>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    [fetchDeleteOrder.fulfilled.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    [fetchDeleteOrder.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [fetchDeleteOrder.rejected.type]: (state, action: PayloadAction<IOrdersError>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const OrdersReducer = OrdersSlice.reducer;

export const {
  clearOrders,
  clearOrdersPagination,
  changeOrdersLimit,
} = OrdersSlice.actions;

export const ordersListSelector = (state: RootState) => state.orders.ordersList;
export const ordersAwaitSelector = (state: RootState) => state.orders.await;
export const ordersErrorSelector = (state: RootState) => state.orders.error;
export const ordersPaginationSelector = (state: RootState) => state.orders.pagination;