import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IBaseCreationDate, IBaseId } from "./base.model";

export interface IBaseUser extends IBaseCreationDate {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}

export interface IUser extends IBaseId, IBaseUser {}

export interface IUsersFilter extends IUser {
  creationDateFrom?: Date;
  creationDateTo?: Date;
}

export interface IUsersRequest {
  filter?: IUsersFilter;
  pagination?: {
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
    limit: number;
  };
}

export interface IUsersResponse {
  response?: Array<IUser>;
  lastVisible?: QueryDocumentSnapshot<DocumentData>;
}