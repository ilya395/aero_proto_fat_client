import { IUser } from "../../../../store/models/users.model";

export interface ICustomersViewProps {
  customers?: Array<IUser>;
  deleteCallback?: (id: string) => void;
  // lastRef?: React.MutableRefObject<JSX.Element | undefined>;
  // callbackRef?: React.Dispatch<React.SetStateAction<Element | null>>;
  callbackRefToFirstElement?: (arg: Element) => void;
  callbackRefToLastElement?: (arg: Element) => void;
}