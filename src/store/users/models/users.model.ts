import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IAuthError } from "../../auth/models/auth.model";
import { IUser } from "../../models/users.model";

export interface IUsersState {
  await: boolean;
  error: IAuthError | null;
  usersList: Array<IUser> | null;
  pagination: {
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  }
}

export interface IDeleteUserState {
  await: boolean;
  error: IAuthError | null;
  delete: null | boolean;
}