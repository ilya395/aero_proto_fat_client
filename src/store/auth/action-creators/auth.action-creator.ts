import { AppDispatch } from "../../root.reducer";
import Firebase from "../../../services/firebase/firebase.service";
import { ISignWithEmail } from "../../../services/firebase/models/firebase.model";
import { AuthSlice } from "../reducers/auth.reducer";
import { EBaseErrorTitles } from "../../../enums/errors.enum";
import { IAuthResponse } from "../models/auth.model";

const firebase = new Firebase();

// eslint-disable-next-line import/prefer-default-export
export const authActionCreator = (object: ISignWithEmail) => async (dispatch: AppDispatch) => {
  try {
    const {
      email,
      password,
    } = object;
    if (email && password) {
      dispatch(AuthSlice.actions.authAwait());
      const response: IAuthResponse = await firebase.signWithEmail(email, password);
      if (response) {
        const { user } = response;
        dispatch(AuthSlice.actions.authSuccess({
          uid: user.uid,
          email: user.email || "",
        }));
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