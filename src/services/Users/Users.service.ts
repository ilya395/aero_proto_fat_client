import { collection, DocumentData, Firestore, getDocs, limit, Query, query, startAfter, Timestamp, where } from "firebase/firestore";
import { PAGINATION_LIMIT } from "../../constants/variables.constant";
import { EInputTypeKeys } from "../../types/enums/inputTypes.enum";
import { IUsersRequest, IUsersResponse } from "../../store/models/users.model";
import FirestoreService from "../Firestore/Firestore.service";
import { EModelKeys } from "../../types/enums/models.enum";

class UsersService extends FirestoreService {
  constructor(firestore: Firestore) {
    super(firestore);

    this.filter = this.filter.bind(this);
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
    });

    let q: Query<DocumentData> | null = null;

    if (pagination.lastVisible) {
      if (array.length) {
        q = query(collection(this.db, EModelKeys.Users), ...array, startAfter(pagination.lastVisible), limit(pagination.limit));
      } else {
        q = query(collection(this.db, EModelKeys.Users), startAfter(pagination.lastVisible), limit(pagination.limit));
      }
    } else if (array.length) {
      q = query(collection(this.db, EModelKeys.Users), ...array, limit(pagination.limit));
    } else {
      q = query(collection(this.db, EModelKeys.Users), limit(pagination.limit));
    }

    const querySnapshot = await getDocs(q);

    const item = querySnapshot.docs[querySnapshot.docs.length - 1];

    const response: Array<DocumentData> = [];

    querySnapshot.forEach((doc) => response.push({
      id: doc.id,
      ...doc.data(),
      creationDate: doc.data().creationDate.toDate(),
    }));

    if (!response && !item) {
      return undefined;
    }

    return {
      response,
      lastVisible: item,
    };
  }
}

export default UsersService;