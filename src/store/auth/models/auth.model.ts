import { UserCredential } from "firebase/auth";
import { IBaseError } from "../../../models/error.model";

export interface IAuthData  {
  accessToken?: string;
  email?: string;
  uid?: string;
}

export interface IAuthResponse extends UserCredential {
  // user: IAuthData;
}

export interface IAuthError extends IBaseError {}

export interface IAuthState {
  await: boolean;
  error: IAuthError | null;
  authData: IAuthData | null;
}