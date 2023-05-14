import { collection, DocumentData, Firestore, getDocs, limit, Query, query, startAfter, Timestamp, where } from "firebase/firestore";
import { PAGINATION_LIMIT } from "../../../constants/variables.constant";
import { EInputTypeKeys } from "../../../types/enums/inputTypes.enum";
import { EModelKeys } from "../../../types/enums/models.enum";
import { IBaseListRequest, IBaseListResponse } from "../../../types/models/base.model";
import FirestoreService from "../../Firestore/Firestore.service";


class ListService<Q extends {[x: string | EInputTypeKeys]: any}> extends FirestoreService {
  key: EModelKeys;

  constructor(firestore: Firestore, key: EModelKeys) {
    super(firestore);
    this.key = key;
    this.getQueryConstraintList = this.getQueryConstraintList.bind(this);
    this.filter = this.filter.bind(this);
  }

  public getQueryConstraintList(filter: Q) {
    const collectionKeysWeHave: [string, any][] = Object.entries(filter);
    return collectionKeysWeHave.map(item => {
      if (item[0] === EInputTypeKeys.CreationDateFrom) {
        return where(EInputTypeKeys.CreationDate, ">=", Timestamp.fromDate(new Date(item[1])));
      }
      if (item[0] === EInputTypeKeys.CreationDateTo) {
        return where(EInputTypeKeys.CreationDate, "<=", Timestamp.fromDate(new Date(item[1])));
      }
      return where(item[0], "==", item[1]);
    });
  }

  public async filter(object: IBaseListRequest<Q>): Promise<IBaseListResponse<DocumentData> | undefined> { // Q -> DocumentData
    const {
      filter = {} as Q,
      pagination = {
        lastVisible: null,
        limit: PAGINATION_LIMIT,
      },
    } = object;

    const array = this.getQueryConstraintList(filter);

    let q: Query<DocumentData> | null = null;

    if (pagination.lastVisible) {
      if (array.length) {
        q = query(collection(this.db, this.key), ...array, startAfter(pagination.lastVisible), limit(pagination.limit));
      } else {
        q = query(collection(this.db, this.key), startAfter(pagination.lastVisible), limit(pagination.limit));
      }
    } else if (array.length) {
      q = query(collection(this.db, this.key), ...array, limit(pagination.limit));
    } else {
      q = query(collection(this.db, this.key), limit(pagination.limit));
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
      response, // as Q[],
      lastVisible: item,
    };
  }
}

export default ListService;