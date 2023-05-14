import { FunctionComponent, ReactNode } from "react";
import { IBaseId } from "../../../../store/models/base.model";
import { ENavigationKeys } from "../../../../types/enums/navigation.enum";

export interface IBaseListProps<T extends IBaseId> {
  items?: Array<T>;
  deleteCallback?: (id: string) => void; // ? double
  callbackRefToFirstElement?: (arg: Element) => void; // ? double
  callbackRefToLastElement?: (arg: Element) => void; // ? double
  path: ENavigationKeys;
  cardComponent?: FunctionComponent<T & { path: ENavigationKeys; deleteCallback: (id: string) => void }>;
  renderCard?: (props: T) => ReactNode;
}