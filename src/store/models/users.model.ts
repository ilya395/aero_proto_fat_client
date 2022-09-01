import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IBaseCreationDate, IBaseId } from "./base.model";

export interface IUser extends IBaseCreationDate, IBaseId {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export interface IUsersFilter extends IUser {
  creationDateFrom?: Date;
  creationDateTo?: Date;
}

export interface IUsersRequest {
  filter?: IUsersFilter;
  pagination?: {
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
  };
}

export interface IUsersResponse {
  response?: Array<IUser>;
  lastVisible?: QueryDocumentSnapshot<DocumentData>;
}