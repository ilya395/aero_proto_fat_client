import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IProduct, IProductsError } from "../../models/products.model";

export interface IProductsState {
  await: boolean;
  error: IProductsError | null;
  productsList: Array<IProduct> | null;
  pagination: {
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
    limit: number;
  }
}