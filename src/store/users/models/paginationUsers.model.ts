import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface IInitialPaginationUsersState {
  lastVisibleItem: null | QueryDocumentSnapshot<DocumentData>;
}