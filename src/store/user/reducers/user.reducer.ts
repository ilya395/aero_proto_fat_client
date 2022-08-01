import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/users.model";
import { RootState } from "../../root.reducer";
import { IUserError, IUserState } from "../models/user.model";

const initialUserState: IUserState = {
  await: false,
  error: null,
  userData: null,
  defaultUserData: null,
}

export const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    userAwaitAction(state) {
      // eslint-disable-next-line no-param-reassign
      state.await = true;
    },
    userErrorAction(state, action: PayloadAction<IUserError>) {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    userSuccessAction(state, action: PayloadAction<IUser>) {
      // eslint-disable-next-line no-param-reassign
      state.await = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.userData = action.payload;
    },
    userResetAction (state) {
      // eslint-disable-next-line no-param-reassign
      state.userData = state.defaultUserData;
    },
    updateUserAction(state, action: PayloadAction<IUser>) {
      // eslint-disable-next-line no-param-reassign
      state.userData = {
        ...state.userData,
        ...action.payload,
      };
    },
  },
});

export const UserReducer = UserSlice.reducer;

export const {
  userAwaitAction,
  userErrorAction,
  userResetAction,
  userSuccessAction,
  updateUserAction,
} = UserSlice.actions;

export const userDataSelector = (state: RootState) => state.user.userData;
export const userAwaitSelector = (state: RootState) => state.user.await;
export const userErrorSelector = (state: RootState) => state.user.error;

export const userPhoneSelector = (state: RootState) => state.user.userData?.phone;
export const userNameSelector = (state: RootState) => state.user.userData?.name;
export const userEmailSelector = (state: RootState) => state.user.userData?.email;
export const userAddressSelector = (state: RootState) => state.user.userData?.address;
export const userCreationDateSelector = (state: RootState) => state.user.userData?.creationDate;

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