import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IKitsFilter } from "../../models/kits.model";
import { RootState } from "../../root.reducer";
import { IInitialKitsFilterState } from "../models/kitsFilter.model";

const initialKitsFilterState: IInitialKitsFilterState = {
  fields: null,
}

export const KitsFilterSlice = createSlice({
  name: "kitsFilter",
  initialState: initialKitsFilterState,
  reducers: {
    updateKitsFilterAction(state, action: PayloadAction<IKitsFilter>) {
      // eslint-disable-next-line no-param-reassign
      state.fields = {
        ...state.fields,
        ...action.payload,
      };
    },
    resetKitsFilterAction(state) {
      // eslint-disable-next-line no-param-reassign
      state.fields = null;
    },
  },
  extraReducers: {},
});

export const KitsFilterReducer = KitsFilterSlice.reducer;

export const {
  updateKitsFilterAction,
  resetKitsFilterAction,
} = KitsFilterSlice.actions;

export const kitsFilterDataSelector = (state: RootState) => state.kitsFilter.fields;