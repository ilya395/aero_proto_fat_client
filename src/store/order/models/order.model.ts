import { IBaseError } from "../../../types/models/error.model";
import { IOrder } from "../../models/orders.model";

export interface IOrderError extends IBaseError {}

export interface IOrderState {
  await: boolean;
  error: IOrderError | null;
  defaultOrderData: IOrder | null;
  orderData: IOrder | null;
  redirectId?: string | null;
}