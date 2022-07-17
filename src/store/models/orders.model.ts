import { IBaseCreationDate } from "./base.model";
import { IKit } from "./kits.model";
import { IUser } from "./users.model";

export interface IOrder extends IBaseCreationDate {
  deliveryDate?: string | Date;
  price?: number;
  comment?: string;
  customer?: IUser;
  order?: Array<IKit>;
}