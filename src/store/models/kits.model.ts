import { IBaseError } from "../../types/models/error.model";
import { IBaseCreationDate, IBaseId } from "./base.model";
import { IProduct } from "./products.model";

export interface IKitsError extends IBaseError {}

export interface IKit extends IBaseCreationDate, IBaseId {
  kitNumber?: number;
  price?: number;
  products?: Array<{
    quantity?: number;
    productId?: IProduct;
  }>;
}

export interface IKitsFilter extends IKit {
  creationDateFrom?: Date;
  creationDateTo?: Date;
}