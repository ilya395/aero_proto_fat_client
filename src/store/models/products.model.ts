import { IBaseCreationDate } from "./base.model";

export interface IProduct extends IBaseCreationDate {
  name?: string;
  purchasePrice?: number;
  price?: number;
  diameter?: string;
  quantity?: number;
  material?: string;
}