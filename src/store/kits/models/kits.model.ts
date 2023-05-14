import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IKit, IKitsError } from "../../models/kits.model";

export interface IKitsState {
  await: boolean;
  error: IKitsError | null;
  kitsList: Array<IKit> | null;
  pagination: {
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
    limit: number;
  }
}