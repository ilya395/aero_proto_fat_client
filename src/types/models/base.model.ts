import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface IBaseListRequest<Q> {
  filter?: Q;
  pagination?: {
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
    limit: number;
  };
}

export interface IBaseListResponse<S> {
  response?: Array<S>;
  lastVisible?: QueryDocumentSnapshot<DocumentData>;
}