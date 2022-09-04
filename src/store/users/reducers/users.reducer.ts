import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PAGINATION_LIMIT } from "../../../constants/variables.constant";
import { IAuthError } from "../../auth/models/auth.model";
import { IUsersResponse } from "../../models/users.model";
import { RootState } from "../../root.reducer";
import { fetchUsersList, updateUsersList } from "../action-creators/users.action-creator";
import { IUsersState } from "../models/users.model";

const initialUsersState: IUsersState = {
  await: false,
  error: null,
  usersList: null,
  pagination: {
    lastVisible: null,
    limit: PAGINATION_LIMIT,
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
    changeUsersLimit(state, action: PayloadAction<number>) {
      // eslint-disable-next-line no-param-reassign
      state.pagination.limit = action.payload;
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

    [updateUsersList.fulfilled.type]: (state, action: PayloadAction<IUsersResponse>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.usersList = action.payload.response || [];
      // eslint-disable-next-line no-param-reassign
      state.pagination.lastVisible = action.payload.lastVisible || null;
    },
    [updateUsersList.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [updateUsersList.rejected.type]: (state, action: PayloadAction<IAuthError>) => {
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
  changeUsersLimit,
} = UsersSlice.actions;

export const usersListSelector = (state: RootState) => state.users.usersList;
export const usersAwaitSelector = (state: RootState) => state.users.await;
export const usersErrorSelector = (state: RootState) => state.users.error;
export const usersPaginationSelector = (state: RootState) => state.users.pagination;