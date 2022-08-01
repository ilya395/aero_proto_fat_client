import { IBaseError } from "../../../models/error.model";
import { IUser } from "../../models/users.model";

export interface IUserError extends IBaseError {}

export interface IUserState {
  await: boolean;
  error: IUserError | null;
  defaultUserData: IUser | null;
  userData: IUser | null;
}