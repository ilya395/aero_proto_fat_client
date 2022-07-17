import { IBaseCreationDate } from "./base.model";

export interface IUser extends IBaseCreationDate {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}