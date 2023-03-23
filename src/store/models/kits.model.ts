import { IBaseError } from "../../types/models/error.model";
import { IBaseCreationDate } from "./base.model";
import { IProduct } from "./products.model";

export interface IKitsError extends IBaseError {}

export interface IKit extends IBaseCreationDate {
  kitNumber?: number;
  price?: number;
  products?: Array<{
    quantity?: number;
    productId?: IProduct;
  }>;
}