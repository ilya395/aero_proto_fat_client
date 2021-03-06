import { IBaseCreationDate, IBaseId } from "./base.model";

export interface IUser extends IBaseCreationDate, IBaseId {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
}