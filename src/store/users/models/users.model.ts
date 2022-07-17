import { IAuthError } from "../../auth/models/auth.model";
import { IUser } from "../../models/users.model";

export interface IUsersState {
  await: boolean;
  error: IAuthError | null;
  usersList: Array<IUser> | null;
}