import { IBaseError } from "../../types/models/error.model";
import { IBaseCreationDate, IBaseId } from "./base.model";
import { IProduct } from "./products.model";

export interface IKitsError extends IBaseError {}

export interface IKit extends IBaseCreationDate, IBaseId {
  kitNumber?: number | null;
  price?: number | null;
  products?: Array<{
    quantity?: number;
    productId?: IProduct;
  }> | null;
  url?: string | null;
}

export interface IKitsFilter extends IKit {
  creationDateFrom?: Date;
  creationDateTo?: Date;
}