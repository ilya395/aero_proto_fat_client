import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "../../root.reducer";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import { ISignWithEmail } from "../../../services/firebase/models/firebase.model";
import { AuthSlice } from "../reducers/auth.reducer";
import { EBaseErrorTitles } from "../../../enums/errors.enum";
import { IAuthData, IAuthResponse } from "../models/auth.model";
import localAuthDataService from "../../../services/localAuthData/localAuthData.service";

export const authActionCreator = (object: ISignWithEmail) => async (dispatch: AppDispatch) => {
  try {
    const {
      email,
      password,
    } = object;
    if (email && password) {
      dispatch(AuthSlice.actions.authAwait());
      const response: IAuthResponse = await firebaseInstance.signWithEmail(email, password);
      if (response) {
        const { user } = response;
        const accessToken = await user.getIdToken();
        const data = {
          uid: user.uid,
          email: user.email || "",
          accessToken,
        } as IAuthData;
        localAuthDataService.setAuthData(JSON.stringify(data));
        dispatch(AuthSlice.actions.authSuccess(data));
      } else {
        dispatch(AuthSlice.actions.authError({
          message: EBaseErrorTitles.FailAuthRequest,
        }));
      }
    } else {
      dispatch(AuthSlice.actions.authError({
        message: EBaseErrorTitles.FailLoginData,
      }));
    }
  } catch (e: any) { // ?
    dispatch(AuthSlice.actions.authError({
      message: e.message,
    }));
  }
}

export const authFetch = createAsyncThunk(
  "auth/fetch",
  async (object: ISignWithEmail, thunkAPi) => {
    try {
      const {
        email,
        password,
      } = object;
      if (email && password) {
        const response: IAuthResponse = await firebaseInstance.signWithEmail(email, password);
        if (response) {
          const { user } = response;
          const accessToken = await user.getIdToken();
          const data = {
            uid: user.uid,
            email: user.email || "",
            accessToken,
          } as IAuthData;
          localAuthDataService.setAuthData(JSON.stringify(data));
          return data;
        }
        return thunkAPi.rejectWithValue({
          message: EBaseErrorTitles.FailAuthRequest,
        });
      }
      return thunkAPi.rejectWithValue({
        message: EBaseErrorTitles.FailLoginData,
      });
    } catch (e) {
      return thunkAPi.rejectWithValue({
        message: EBaseErrorTitles.FailLoginData,
      });
    }
  },
);