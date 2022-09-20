import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsersFilter } from "../../models/users.model";
import { RootState } from "../../root.reducer";
import { IUsersFilterState } from "../models/usersFilter.model";

const initialUsersFilterState: IUsersFilterState = {
  // await: false,
  // error: null,
  fields: null,
}

export const UsersFilterSlice = createSlice({
  name: "usersFilter",
  initialState: initialUsersFilterState,
  reducers: {
    updateUsersFilterAction(state, action: PayloadAction<IUsersFilter>) {
      // eslint-disable-next-line no-param-reassign
      state.fields = {
        ...state.fields,
        ...action.payload,
      };
    },
    resetUsersFilterAction(state) {
      // eslint-disable-next-line no-param-reassign
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
// export const usersFilterAwaitSelector = (state: RootState) => state.usersFilter.await;
// export const usersFilterErrorSelector = (state: RootState) => state.usersFilter.error;