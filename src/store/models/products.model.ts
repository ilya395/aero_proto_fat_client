import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IBaseError } from "../../types/models/error.model";
import { IBaseCreationDate, IBaseId } from "./base.model";

export interface IProductsError extends IBaseError {}

export interface IProduct extends IBaseCreationDate, IBaseId {
  name?: string | null;
  purchasePrice?: number | null;
  price?: number | null;
  diameter?: string | null;
  quantity?: number | null;
  material?: string | null;
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