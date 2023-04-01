import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { IOrderError, IOrderState } from "../models/order.model";
import { IOrder } from "../../models/orders.model";
import { getOrder, putOrder, updateOrder } from "../action-creators/order.action-creator";
import { RootState } from "../../root.reducer";

const initialOrderState: IOrderState = {
  await: false,
  error: null,
  orderData: null,
  defaultOrderData: null,
  redirectId: null,
}

export const OrderSlice = createSlice({
  name: "order",
  initialState: initialOrderState,
  reducers: {
    resetOrderDataAction: state => {
      state.orderData = state.defaultOrderData;
    },
    addNewOrderAction(state) {
      state.orderData = {};
      state.defaultOrderData = {};
    },
    changeOrderDataAction(state, action: PayloadAction<IOrder>) {
      state.orderData = {
        ...state.orderData,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [getOrder.pending.type]: (state) => {
      state.await = true;
    },
    [getOrder.fulfilled.type]: (state, action: PayloadAction<IOrder>) => {
      state.await = false;
      state.error = null;
      state.defaultOrderData = action.payload;
      state.orderData = action.payload;
      state.redirectId = null;
    },
    [getOrder.rejected.type]: (state, action: PayloadAction<IOrderError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [putOrder.pending.type]: state => {
      state.await = true;
    },
    [putOrder.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.await = false;
      state.error = null;
      state.redirectId = action.payload;
    },
    [putOrder.rejected.type]: (state, action: PayloadAction<IOrderError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [updateOrder.pending.type]: state => {
      state.await = true;
    },
    [updateOrder.fulfilled.type]: (state, action: PayloadAction<IOrder>) => {
      state.await = false;
      state.error = null;
      state.defaultOrderData = action.payload;
      state.orderData = action.payload;
      state.redirectId = null;
    },
    [updateOrder.rejected.type]: (state, action: PayloadAction<IOrderError>) => {
      state.await = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetOrderDataAction,
  addNewOrderAction,
  changeOrderDataAction,
} = OrderSlice.actions;

export const OrderReducer = OrderSlice.reducer;

export const orderAwaitSelector = (state: RootState) => state.order.await;
export const orderErrorSelector = (state: RootState) => state.order.error;
export const orderRedirectIdSelect = (state: RootState) => state.order.redirectId;
export const orderDataSelect = (state: RootState) => state.order.orderData;

export const orderDeliveryDateSelector = (state: RootState) => state.order.orderData?.deliveryDate;
export const orderPriceSelector = (state: RootState) => state.order.orderData?.price;
export const orderCommentSelector = (state: RootState) => state.order.orderData?.comment;
export const orderCustomerSelector = (state: RootState) => state.order.orderData?.customer;
export const orderOrderSelector = (state: RootState) => state.order.orderData?.order;

export const orderRedirectIdSelector = createSelector(
  [orderRedirectIdSelect],
  (id) => id,
);

export const orderDeliveryDateMemoSelector = createSelector(
  [orderDeliveryDateSelector],
  (arg) => arg,
);
export const orderPriceMemoSelector = createSelector(
  [orderPriceSelector],
  (arg) => arg,
);
export const orderCommentMemoSelector = createSelector(
  [orderCommentSelector],
  (arg) => arg,
);