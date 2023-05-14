import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PAGINATION_LIMIT } from "../../../constants/variables.constant";
import { IProductsError, IProductsResponse } from "../../models/products.model";
import { RootState } from "../../root.reducer";
import { fetchDeleteProduct, filterNextProductsList, filterProductsList } from "../action-creators/products.action-creator";
import { IProductsState } from "../models/products.model";

const initialProductsState: IProductsState = {
  await: false,
  error: null,
  productsList: null,
  pagination: {
    lastVisible: null,
    limit: PAGINATION_LIMIT,
  }
}

export const ProductsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    clearProducts() {
      return initialProductsState;
    },
    clearProductsPagination(state) {
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = null;
    },
    changeProductsLimit(state, action: PayloadAction<number>) {
      // eslint-disable-next-line no-param-reassign
      state.pagination.limit = action.payload;
    },
  },
  extraReducers: {
    [filterProductsList.fulfilled.type]: (state, action: PayloadAction<IProductsResponse>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.productsList = action.payload.response || [];
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = action.payload.lastVisible || null;
    },
    [filterProductsList.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [filterProductsList.rejected.type]: (state, action: PayloadAction<IProductsError>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    [filterNextProductsList.fulfilled.type]: (state, action: PayloadAction<IProductsResponse>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.productsList = [
        ...state.productsList || [],
        ...action.payload.response || []
      ];
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = action.payload.lastVisible || null;
    },
    [filterNextProductsList.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [filterNextProductsList.rejected.type]: (state, action: PayloadAction<IProductsError>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    [fetchDeleteProduct.fulfilled.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    [fetchDeleteProduct.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [fetchDeleteProduct.rejected.type]: (state, action: PayloadAction<IProductsError>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const ProductsReducer = ProductsSlice.reducer;

export const {
  clearProducts,
  clearProductsPagination,
  changeProductsLimit,
} = ProductsSlice.actions;

export const productsListSelector = (state: RootState) => state.products.productsList;
export const productsAwaitSelector = (state: RootState) => state.products.await;
export const productsErrorSelector = (state: RootState) => state.products.error;
export const productsPaginationSelector = (state: RootState) => state.products.pagination;