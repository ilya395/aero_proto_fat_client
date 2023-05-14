import { collection, DocumentData, Firestore, getDocs, limit, query, Query, startAfter, Timestamp, where } from "firebase/firestore";
import { PAGINATION_LIMIT } from "../../constants/variables.constant";
import { EInputTypeKeys } from "../../types/enums/inputTypes.enum";
import { IProductsRequest, IProductsResponse } from "../../store/models/products.model";
import FirestoreService from "../Firestore/Firestore.service";
import { EModelKeys } from "../../types/enums/models.enum";

class ProductsService extends FirestoreService {
  constructor(firestore: Firestore) {
    super(firestore);

    this.filter = this.filter.bind(this);
  }

  public async filter(object: IProductsRequest): Promise<IProductsResponse | undefined> {
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
        q = query(collection(this.db, EModelKeys.Products), ...array, startAfter(pagination.lastVisible), limit(pagination.limit));
      } else {
        q = query(collection(this.db, EModelKeys.Products), startAfter(pagination.lastVisible), limit(pagination.limit));
      }
    } else if (array.length) {
      q = query(collection(this.db, EModelKeys.Products), ...array, limit(pagination.limit));
    } else {
      q = query(collection(this.db, EModelKeys.Products), limit(pagination.limit));
    }

    const querySnapshot = await getDocs(q);

    const item = querySnapshot.docs[querySnapshot.docs.length - 1];

    const response:Array<DocumentData> = [];

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

export default ProductsService;