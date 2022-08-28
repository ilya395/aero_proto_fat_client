import { collection, deleteDoc, doc, DocumentData, Firestore, getDocs, query, Timestamp, where } from "firebase/firestore";
import { EInputTypeKeys } from "../../enums/inputTypes.enum";
import { IUsersFilter } from "../../store/models/users.model";
import FirestoreService from "../Firestore/Firestore.service";

class UsersService extends FirestoreService {
  constructor(firestore: Firestore) {
    super(firestore);

    this.filter = this.filter.bind(this);
  }

  public async filter(object: IUsersFilter) {
    const collectionKeysWeHave = Object.entries(object);
    const array = collectionKeysWeHave.map(item => {
      if (item[0] === EInputTypeKeys.CreationDateFrom) {
        return where(EInputTypeKeys.CreationDate, ">=", Timestamp.fromDate(new Date(item[1])));
      }
      if (item[0] === EInputTypeKeys.CreationDateTo) {
        return where(EInputTypeKeys.CreationDate, "<=", Timestamp.fromDate(new Date(item[1])));
      }
      return where(item[0], "==", item[1]);
    })
    const q = array.length ? query(collection(this.db, "users"), ...array) : query(collection(this.db, "users"));
    const querySnapshot = await getDocs(q);
    const response:Array<DocumentData> = [];
    querySnapshot.forEach((doc) => response.push({
      id: doc.id,
      ...doc.data(),
      creationDate: doc.data().creationDate.toDate(),
    }));
    if (response) {
      return response;
    }
    return undefined;
  }

  public async deleteOne(id: string) {
    await deleteDoc(doc(this.db, "users", id));
  }
}

export default UsersService;