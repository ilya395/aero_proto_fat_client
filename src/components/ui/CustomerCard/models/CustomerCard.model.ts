import { IUser } from "../../../../store/models/users.model";

export interface ICustomerCardProps extends IUser {
  deleteCallback?: (id: string) => void;
}