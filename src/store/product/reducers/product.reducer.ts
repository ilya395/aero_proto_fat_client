import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/products.model";
import { RootState } from "../../root.reducer";
import { getProduct, putProduct, updateProduct } from "../action-creators/product.action-creator";
import { IProductError, IProductState } from "../models/product.model";

const initialProductState: IProductState = {
  await: false,
  error: null,
  productData: null,
  defaultProductData: null,
  redirectId: null,
}

export const ProductSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    resetProductDataAction: state => {
      state.productData = state.defaultProductData;
    },
    addNewProductAction(state) {
      state.productData = {};
      state.defaultProductData = {};
    },
    changeProductDataAction(state, action: PayloadAction<IProduct>) {
      state.productData = {
        ...state.productData,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [getProduct.pending.type]: (state) => {
      state.await = true;
    },
    [getProduct.fulfilled.type]: (state, action: PayloadAction<IProduct>) => {
      state.await = false;
      state.error = null;
      state.defaultProductData = action.payload;
      state.productData = action.payload;
      state.redirectId = null;
    },
    [getProduct.rejected.type]: (state, action: PayloadAction<IProductError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [putProduct.pending.type]: state => {
      state.await = true;
    },
    [putProduct.fulfilled.type]: (state, action: PayloadAction<IProduct>) => {
      state.redirectId = action.payload.id;
    },
    [putProduct.rejected.type]: (state, action: PayloadAction<IProductError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [updateProduct.pending.type]: state => {
      state.await = true;
    },
    [updateProduct.fulfilled.type]: (state, action: PayloadAction<IProduct>) => {
      state.await = false;
      state.error = null;
      state.defaultProductData = action.payload;
      state.productData = action.payload;
      state.redirectId = null;
    },
    [updateProduct.rejected.type]: (state, action: PayloadAction<IProductError>) => {
      state.await = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetProductDataAction,
  addNewProductAction,
  changeProductDataAction,
} = ProductSlice.actions;

export const ProductReducer = ProductSlice.reducer;

export const productAwaitSelector = (state: RootState) => state.product.await;
export const productErrorSelector = (state: RootState) => state.product.error;
export const productRedirectIdSelect = (state: RootState) => state.product.redirectId;

export const productCreationDateSelector = (state: RootState) => state.product.productData?.creationDate;
export const productDiameterSelector = (state: RootState) => state.product.productData?.diameter;
export const productMaterialSelector = (state: RootState) => state.product.productData?.material;
export const productNameSelector = (state: RootState) => state.product.productData?.name;
export const productPriceSelector = (state: RootState) => state.product.productData?.price;
export const productPurchasePriceSelector = (state: RootState) => state.product.productData?.purchasePrice;
export const productQuantitySelector = (state: RootState) => state.product.productData?.quantity;

export const productCreationDateMemoSelector = createSelector(
  [productCreationDateSelector],
  (creationDate) => creationDate,
);
export const productDiameterMemoSelector = createSelector(
  [productDiameterSelector],
  (diameter) => diameter,
);
export const productMaterialMemoSelector = createSelector(
  [productMaterialSelector],
  (material) => material,
);
export const productNameMemoSelector = createSelector(
  [productNameSelector],
  (name) => name,
);
export const productPriceMemoSelector = createSelector(
  [productPriceSelector],
  (price) => price,
);
export const productPurchasePriceMemoSelector = createSelector(
  [productPurchasePriceSelector],
  (purchasePrice) => purchasePrice,
);
export const productQuantityMemoSelector = createSelector(
  [productQuantitySelector],
  (quantity) => quantity,
);
export const productRedirectIdMemoSelector = createSelector(
  [productRedirectIdSelect],
  (redirectId) => redirectId,
);