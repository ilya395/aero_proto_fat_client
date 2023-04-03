import { IBaseError } from "../../../types/models/error.model";
import { IUsersFilter } from "../../models/users.model";

export interface IUsersFilterError extends IBaseError {}

export interface IUsersFilterState {
  fields: null | IUsersFilter;
}