import { IUser } from "../../../../store/models/users.model";

export interface ICustomerCardProps extends IUser {
  deleteCallback?: (arg?: {id: string | number;}) => void;
}