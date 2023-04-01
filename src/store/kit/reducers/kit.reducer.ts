import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IKit } from "../../models/kits.model";
import { RootState } from "../../root.reducer";
import { getKit, putKit, updateKit } from "../action-creators/kit.action-creator";
import { IKitError, IKitState } from "../models/kit.model";

const initialKitState: IKitState = {
  await: false,
  error: null,
  kitData: null,
  defaultKitData: null,
  redirectId: null,
}

export const KitSlice = createSlice({
  name: "kit",
  initialState: initialKitState,
  reducers: {
    resetKitDataAction: state => {
      state.kitData = state.defaultKitData;
    },
    addNewKitAction(state) {
      state.kitData = {};
      state.defaultKitData = {};
    },
    changeKitDataAction(state, action: PayloadAction<IKit>) {
      state.kitData = {
        ...state.kitData,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [getKit.pending.type]: (state) => {
      state.await = true;
    },
    [getKit.fulfilled.type]: (state, action: PayloadAction<IKit>) => {
      state.await = false;
      state.error = null;
      state.defaultKitData = action.payload;
      state.kitData = action.payload;
      state.redirectId = null;
    },
    [getKit.rejected.type]: (state, action: PayloadAction<IKitError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [putKit.pending.type]: state => {
      state.await = true;
    },
    [putKit.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.await = false;
      state.error = null;
      state.redirectId = action.payload;
    },
    [putKit.rejected.type]: (state, action: PayloadAction<IKitError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [updateKit.pending.type]: state => {
      state.await = true;
    },
    [updateKit.fulfilled.type]: (state, action: PayloadAction<IKit>) => {
      state.await = false;
      state.error = null;
      state.defaultKitData = action.payload;
      state.kitData = action.payload;
      state.redirectId = null;
    },
    [updateKit.rejected.type]: (state, action: PayloadAction<IKitError>) => {
      state.await = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetKitDataAction,
  addNewKitAction,
  changeKitDataAction,
} = KitSlice.actions;

export const KitReducer = KitSlice.reducer;

export const kitAwaitSelector = (state: RootState) => state.kit.await;
export const kitErrorSelector = (state: RootState) => state.kit.error;
export const kitRedirectIdSelector = (state: RootState) => state.kit.redirectId;
export const kitDataSelect = (state: RootState) => state.kit.kitData;

export const kitCreationDateSelector = (state: RootState) => state.kit.kitData?.creationDate;
export const kitNumberSelector = (state: RootState) => state.kit.kitData?.kitNumber;
export const kitPriceSelector = (state: RootState) => state.kit.kitData?.price;

export const kitCreationDateMemoSelector = createSelector(
  [kitCreationDateSelector],
  (creationDate) => creationDate,
);
export const kitNumberMemoSelector = createSelector(
  [kitNumberSelector],
  (number) => number,
);
export const kitPriceMemoSelector = createSelector(
  [kitPriceSelector],
  (price) => price,
);

export const kitRedirectIdMemoSelector = createSelector(
  [kitRedirectIdSelector],
  (id) => id,
);