import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsersFilter } from "../../models/users.model";
import { RootState } from "../../root.reducer";
import { IUsersFilterState } from "../models/usersFilter.model";

const initialUsersFilterState: IUsersFilterState = {
  fields: null,
}

export const UsersFilterSlice = createSlice({
  name: "usersFilter",
  initialState: initialUsersFilterState,
  reducers: {
    updateUsersFilterAction(state, action: PayloadAction<IUsersFilter>) {
      state.fields = {
        ...state.fields,
        ...action.payload,
      };
    },
    resetUsersFilterAction(state) {
      state.fields = null;
    },
  },
  extraReducers: {},
});

export const UsersFilterReducer = UsersFilterSlice.reducer;

export const {
  updateUsersFilterAction,
  resetUsersFilterAction,
} = UsersFilterSlice.actions;

export const usersFilterDataSelector = (state: RootState) => state.usersFilter.fields;