import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IOrder, IOrdersError } from "../../models/orders.model";

export interface IOrdersState {
  await: boolean;
  error: IOrdersError | null;
  ordersList: Array<IOrder> | null;
  pagination: {
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
    limit: number;
  }
}