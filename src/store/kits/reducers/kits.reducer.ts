import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PAGINATION_LIMIT } from "../../../constants/variables.constant";
import { IBaseListResponse } from "../../../types/models/base.model";
import { IKit, IKitsError } from "../../models/kits.model";
import { RootState } from "../../root.reducer";
import { fetchDeleteKit, fetchKitsList, fetcNextKitsList } from "../action-creators/kits.action-creator";
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
    clearKits() {
      return initialKitsState;
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
      state.await = false;
      state.error = null;
      state.kitsList = action.payload.response || [];
      state.pagination.lastVisible = action.payload.lastVisible || null;
    },
    [fetchKitsList.pending.type]: (state) => {
      state.await = true;
    },
    [fetchKitsList.rejected.type]: (state, action: PayloadAction<IKitsError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [fetcNextKitsList.fulfilled.type]: (state, action: PayloadAction<IBaseListResponse<IKit>>) => {
      state.await = false;
      state.error = null;
      state.kitsList = [
        ...state.kitsList || [],
        ...action.payload.response || []
      ];
      state.pagination.lastVisible = action.payload.lastVisible || null;
    },
    [fetcNextKitsList.pending.type]: (state) => {
      state.await = true;
    },
    [fetcNextKitsList.rejected.type]: (state, action: PayloadAction<IKitsError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [fetchDeleteKit.fulfilled.type]: (state) => {
      state.await = false;
      state.error = null;
    },
    [fetchDeleteKit.pending.type]: (state) => {
      state.await = true;
    },
    [fetchDeleteKit.rejected.type]: (state, action: PayloadAction<IKitsError>) => {
      state.await = false;
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
