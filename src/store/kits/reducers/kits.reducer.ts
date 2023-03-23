import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PAGINATION_LIMIT } from "../../../constants/variables.constant";
import { IBaseListResponse } from "../../../types/models/base.model";
import { IKit, IKitsError } from "../../models/kits.model";
import { RootState } from "../../root.reducer";
import { fetchDeleteKit, fetchKitsList } from "../action-creators/kits.action-creator";
import { IKitsState } from "../models/kits.model";

const initialKitsState: IKitsState = {
  await: false,
  error: null,
  kitsList: null,
  pagination: {
    lastVisible: null,
    limit: PAGINATION_LIMIT,
  }
}

export const KitsSlice = createSlice({
  name: "kits",
  initialState: initialKitsState,
  reducers: {
    clearKits(state) {
      // eslint-disable-next-line no-param-reassign
      state = initialKitsState;
    },
    clearKitsPagination(state) {
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = null;
    },
    changeKitsLimit(state, action: PayloadAction<number>) {
      // eslint-disable-next-line no-param-reassign
      state.pagination.limit = action.payload;
    },
  },
  extraReducers: {
    [fetchKitsList.fulfilled.type]: (state, action: PayloadAction<IBaseListResponse<IKit>>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.kitsList = action.payload.response || [];
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = action.payload.lastVisible || null;
    },
    [fetchKitsList.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [fetchKitsList.rejected.type]: (state, action: PayloadAction<IKitsError>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    [fetchDeleteKit.fulfilled.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
    [fetchDeleteKit.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [fetchDeleteKit.rejected.type]: (state, action: PayloadAction<IKitsError>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const KitsReducer = KitsSlice.reducer;

export const {
  clearKits,
  clearKitsPagination,
  changeKitsLimit,
} = KitsSlice.actions;

export const kitsListSelector = (state: RootState) => state.kits.kitsList;
export const kitsAwaitSelector = (state: RootState) => state.kits.await;
export const kitsErrorSelector = (state: RootState) => state.kits.error;
export const kitsPaginationSelector = (state: RootState) => state.kits.pagination;
