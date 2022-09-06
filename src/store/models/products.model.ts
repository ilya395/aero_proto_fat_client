import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IBaseError } from "../../models/error.model";
import { IBaseCreationDate, IBaseId } from "./base.model";

export interface IProductsError extends IBaseError {}

export interface IProduct extends IBaseCreationDate, IBaseId {
  name?: string;
  purchasePrice?: number;
  price?: number;
  diameter?: string;
  quantity?: number;
  material?: string;
}

export interface IProductsFilter extends IProduct {
  creationDateFrom?: Date;
  creationDateTo?: Date;
}

export interface IProductsRequest {
  filter?: IProductsFilter;
  pagination?: {
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
    limit: number;
  };
}

export interface IProductsResponse {
  response?: Array<IProduct>;
  lastVisible?: QueryDocumentSnapshot<DocumentData>;
}