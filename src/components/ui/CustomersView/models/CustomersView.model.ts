import { IUser } from "../../../../store/models/users.model";

export interface ICustomersViewProps {
  customers?: Array<IUser>;
  deleteCallback?: (id: string) => void;
}