import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthError } from "../../auth/models/auth.model";
import { IUser } from "../../models/users.model";
import { RootState } from "../../root.reducer";
import { fetchDeleteUser, fetchUsersList } from "../action-creators/users.action-creator";
import { IDeleteUserState, IUsersState } from "../models/users.model";

const initialUsersState: IUsersState = {
  await: false,
  error: null,
  usersList: null,
}

export const UsersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  reducers: {},
  extraReducers: {
    [fetchUsersList.fulfilled.type]: (state, action: PayloadAction<Array<IUser>>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.usersList = action.payload;
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

export const usersListSelector = (state: RootState) => state.users.usersList;
export const usersAwaitSelector = (state: RootState) => state.users.await;
export const usersErrorSelector = (state: RootState) => state.users.error;


const initialDeleteUserState: IDeleteUserState = {
  await: false,
  error: null,
  delete: null,
}

export const DeleteUserSlice = createSlice({
  name: "deleteUser",
  initialState: initialDeleteUserState,
  reducers: {},
  extraReducers: {
    [fetchDeleteUser.fulfilled.type]: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.delete = action.payload;
    },
    [fetchDeleteUser.pending.type]: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    [fetchDeleteUser.rejected.type]: (state, action: PayloadAction<IAuthError>) => {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const DeleteUserReducer = UsersSlice.reducer;