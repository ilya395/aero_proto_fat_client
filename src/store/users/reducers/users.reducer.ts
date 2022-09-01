import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthError } from "../../auth/models/auth.model";
import { IUsersResponse } from "../../models/users.model";
import { RootState } from "../../root.reducer";
import { fetchUsersList } from "../action-creators/users.action-creator";
import { IUsersState } from "../models/users.model";

const initialUsersState: IUsersState = {
  await: false,
  error: null,
  usersList: null,
  pagination: {
    lastVisible: null,
  }
}

export const UsersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {
    clearUsers(state) {
      // eslint-disable-next-line no-param-reassign
      state = initialUsersState;
    },
    clearUsersPagination(state) {
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = null;
    },
  },
  extraReducers: {
    [fetchUsersList.fulfilled.type]: (state, action: PayloadAction<IUsersResponse>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.usersList = [
        ...state.usersList || [],
        ...action.payload.response || []
      ];
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = action.payload.lastVisible || null;
    },
    [fetchUsersList.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [fetchUsersList.rejected.type]: (state, action: PayloadAction<IAuthError>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const UsersReducer = UsersSlice.reducer;

export const {
  clearUsers,
  clearUsersPagination,
} = UsersSlice.actions;

export const usersListSelector = (state: RootState) => state.users.usersList;
export const usersAwaitSelector = (state: RootState) => state.users.await;
export const usersErrorSelector = (state: RootState) => state.users.error;
export const usersPaginationSelector = (state: RootState) => state.users.pagination.lastVisible;