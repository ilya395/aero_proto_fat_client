import { IBaseError } from "../../../types/models/error.model";
import { IProduct } from "../../models/products.model";

export interface IProductError extends IBaseError {}

export interface IProductState {
  await: boolean;
  error: IProductError | null;
  defaultProductData: IProduct | null;
  productData: IProduct | null;
  redirectId?: string | null;
}