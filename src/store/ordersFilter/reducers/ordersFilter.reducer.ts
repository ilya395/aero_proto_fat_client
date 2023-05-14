import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrdersFilter } from "../../models/orders.model";
import { RootState } from "../../root.reducer";
import { IInitialOrdersFilterState } from "../models/ordersFilter.model";

const initialOrdersFilterState: IInitialOrdersFilterState = {
  fields: null,
}

const OrdersFilterSlice = createSlice({
  name: "ordersFilter",
  initialState: initialOrdersFilterState,
  reducers: {
    updateOrdersFilterAction(state, action: PayloadAction<IOrdersFilter>) {
      // eslint-disable-next-line no-param-reassign
      state.fields = {
        ...state.fields,
        ...action.payload,
      };
    },
    resetOrdersFilterAction(state) {
      // eslint-disable-next-line no-param-reassign
      state.fields = null;
    },
  },
  extraReducers: {},
});

export const OrdersFilterReducer = OrdersFilterSlice.reducer;

export const {
  updateOrdersFilterAction,
  resetOrdersFilterAction,
} = OrdersFilterSlice.actions;

export const ordersFilterDataSelector = (state: RootState) => state.ordersFilter.fields;