import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../root.reducer";
import { IAuthData, IAuthError, IAuthState } from "../models/auth.model";

const initialAuthState: IAuthState = {
  await: false,
  error: null,
  authData: null,
}

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    authAwait(state) {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    authError(state, action: PayloadAction<IAuthError>) {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    authSuccess(state, action: PayloadAction<IAuthData>) {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.authData = action.payload;
    }
  },
});

export const AuthReducer = AuthSlice.reducer;

export const { authAwait, authSuccess, authError } = AuthSlice.actions;

export const authDataSelector = (state: RootState) => state.auth.authData;
export const authAwaitSelector = (state: RootState) => state.auth.await;
export const authErrorSelector = (state: RootState) => state.auth.error;
