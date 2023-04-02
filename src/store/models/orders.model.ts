import { IBaseError } from "../../types/models/error.model";
import { IBaseCreationDate, IBaseId } from "./base.model";
import { IKit } from "./kits.model";
import { IUser } from "./users.model";

export interface IOrdersError extends IBaseError {}

export interface IOrder extends IBaseCreationDate, IBaseId {
  deliveryDate?: string | Date | null;
  price?: number | null;
  comment?: string | null;
  customer?: IUser | null;
  order?: Array<IKit> | null;
}

export interface IOrdersFilter extends IOrder {
  creationDateFrom?: Date;
  creationDateTo?: Date;
  deliveryDateFrom?: Date;
  deliveryDateTo?: Date;
}