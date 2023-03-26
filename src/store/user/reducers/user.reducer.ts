import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/users.model";
import { RootState } from "../../root.reducer";
import { createUser, fetchOneUser, updateUser } from "../action-creators/user.action-creator";
import { IUserError, IUserState } from "../models/user.model";

const initialUserState: IUserState = {
  await: false,
  error: null,
  userData: null,
  defaultUserData: null,
  redirectId: null,
}

export const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    userResetAction (state) {
      // eslint-disable-next-line no-param-reassign
      state.userData = state.defaultUserData;
    },
    userAddNewAction(state) {
      // eslint-disable-next-line no-param-reassign
      state.userData = {};
      // eslint-disable-next-line no-param-reassign
      state.defaultUserData = {};
    },
    userChangeDataAction(state, action: PayloadAction<IUser>) {
      // eslint-disable-next-line no-param-reassign
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [fetchOneUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.await = false;
      state.error = null;
      state.userData = action.payload;
      state.defaultUserData = action.payload;
      state.redirectId = null;
    },
    [fetchOneUser.pending.type]: (state) => {
      state.await = true;
    },
    [fetchOneUser.rejected.type]: (state, action: PayloadAction<IUserError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.await = false;
      state.error = null;
      state.userData = action.payload;
      state.defaultUserData = action.payload;
      state.redirectId = null;
    },
    [updateUser.pending.type]: (state) => {
      state.await = true;
    },
    [updateUser.rejected.type]: (state, action: PayloadAction<IUserError>) => {
      state.await = false;
      state.error = action.payload;
    },
    [createUser.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.await = false;
      state.error = null;
      state.redirectId = action.payload;
    },
    [createUser.pending.type]: (state) => {
      state.await = true;
    },
    [createUser.rejected.type]: (state, action: PayloadAction<IUserError>) => {
      state.await = false;
      state.error = action.payload;
    },
  },
});

export const UserReducer = UserSlice.reducer;

export const {
  userResetAction,
  userAddNewAction,
  userChangeDataAction,
} = UserSlice.actions;

export const userDataSelector = (state: RootState) => state.user.userData;
export const userAwaitSelector = (state: RootState) => state.user.await;
export const userErrorSelector = (state: RootState) => state.user.error;

export const userPhoneSelector = (state: RootState) => state.user.userData?.phone;
export const userNameSelector = (state: RootState) => state.user.userData?.name;
export const userEmailSelector = (state: RootState) => state.user.userData?.email;
export const userAddressSelector = (state: RootState) => state.user.userData?.address;
export const userCreationDateSelector = (state: RootState) => state.user.userData?.creationDate;
export const userRedirectIdSelector = (state: RootState) => state.user.redirectId;

export const userPhoneMemoSelector = createSelector(
  [userPhoneSelector],
  (phone) => phone,
);
export const userNameMemoSelector = createSelector(
  [userNameSelector],
  (name) => name,
);
export const userEmailMemoSelector = createSelector(
  [userEmailSelector],
  (email) => email,
);
export const userAddressMemoSelector = createSelector(
  [userAddressSelector],
  (address) => address,
);
export const userCreationDateMemoSelector = createSelector(
  [userCreationDateSelector],
  (creationDate) => creationDate,
);
export const userRedirectIdMemoSelector = createSelector(
  [userRedirectIdSelector],
  (redirectId) => redirectId,
);