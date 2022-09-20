import { IProduct } from "../../../../store/models/products.model";

export interface IProductsViewProps {
  products?: Array<IProduct>;
  deleteCallback?: (id: string) => void; // ? double
  callbackRefToFirstElement?: (arg: Element) => void; // ? double
  callbackRefToLastElement?: (arg: Element) => void; // ? double
}