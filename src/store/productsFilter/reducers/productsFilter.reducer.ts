import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductsFilter } from "../../models/products.model";
import { RootState } from "../../root.reducer";
import { IInitialProductsFilterState } from "../models/productsFilter.model";

const initialProductsFilterState: IInitialProductsFilterState = {
  fields: null,
}

export const ProductsFilterSlice = createSlice({
  name: "productsFilter",
  initialState: initialProductsFilterState,
  reducers: {
    updateProductsFilterAction(state, action: PayloadAction<IProductsFilter>) {
      // eslint-disable-next-line no-param-reassign
      state.fields = {
        ...state.fields,
        ...action.payload,
      };
    },
    resetProductsFilterAction(state) {
      // eslint-disable-next-line no-param-reassign
      state.fields = null;
    },
  },
  extraReducers: {},
});

export const ProductsFilterReducer = ProductsFilterSlice.reducer;

export const {
  updateProductsFilterAction,
  resetProductsFilterAction,
} = ProductsFilterSlice.actions;

export const productsFilterDataSelector = (state: RootState) => state.productsFilter.fields;