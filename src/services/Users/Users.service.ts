import { collection, deleteDoc, doc, DocumentData, Firestore, getDocs, limit, Query, query, startAfter, Timestamp, where } from "firebase/firestore";
import { PAGINATION_LIMIT } from "../../constants/variables.constant";
import { EInputTypeKeys } from "../../enums/inputTypes.enum";
import { IUsersRequest, IUsersResponse } from "../../store/models/users.model";
import FirestoreService from "../Firestore/Firestore.service";

class UsersService extends FirestoreService {
  constructor(firestore: Firestore) {
    super(firestore);

    this.filter = this.filter.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  public async filter(object: IUsersRequest): Promise<IUsersResponse | undefined> {
    const {
      filter = {},
      pagination = {
        lastVisible: null,
        limit: PAGINATION_LIMIT,
      },
    } = object;
    const collectionKeysWeHave = Object.entries(filter);
    const array = collectionKeysWeHave.map(item => {
      if (item[0] === EInputTypeKeys.CreationDateFrom) {
        return where(EInputTypeKeys.CreationDate, ">=", Timestamp.fromDate(new Date(item[1])));
      }
      if (item[0] === EInputTypeKeys.CreationDateTo) {
        return where(EInputTypeKeys.CreationDate, "<=", Timestamp.fromDate(new Date(item[1])));
      }
      return where(item[0], "==", item[1]);
    })
    let q: Query<DocumentData> | null = null;
    if (pagination.lastVisible) {
      if (array.length) {
        q = query(collection(this.db, "users"), ...array, startAfter(pagination.lastVisible), limit(pagination.limit));
      } else {
        q = query(collection(this.db, "users"), startAfter(pagination.lastVisible), limit(pagination.limit));
      }
    } else if (array.length) {
      q = query(collection(this.db, "users"), ...array, limit(pagination.limit));
    } else {
      q = query(collection(this.db, "users"), limit(pagination.limit));
    }

    const querySnapshot = await getDocs(q);

    const item = querySnapshot.docs[querySnapshot.docs.length - 1];

    const response:Array<DocumentData> = [];
    querySnapshot.forEach((doc) => response.push({
      id: doc.id,
      ...doc.data(),
      creationDate: doc.data().creationDate.toDate(),
    }));
    if (!response.length && !item) {
      return undefined;
    }
    return {
      response,
      lastVisible: item,
    };
  }

  public async deleteOne(id: string) {
    await deleteDoc(doc(this.db, "users", id));
  }
}

export default UsersService;