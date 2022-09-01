import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthError } from "../../auth/models/auth.model";
import { fetchDeleteUser } from "../action-creators/users.action-creator";
import { IDeleteUserState } from "../models/users.model";

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

export const DeleteUserReducer = DeleteUserSlice.reducer;

