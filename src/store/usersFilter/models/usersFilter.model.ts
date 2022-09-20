import { IBaseError } from "../../../models/error.model";
import { IUsersFilter } from "../../models/users.model";

export interface IUsersFilterError extends IBaseError {}

export interface IUsersFilterState {
  // await: boolean;
  // error: null | IUsersFilterError;
  fields: null | IUsersFilter;
}