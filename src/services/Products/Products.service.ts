import { collection, deleteDoc, doc, DocumentData, Firestore, getDocs, limit, query, Query, startAfter, Timestamp, where } from "firebase/firestore";
import { PAGINATION_LIMIT, PRODUCTS_DATA_BASE_KEY } from "../../constants/variables.constant";
import { EInputTypeKeys } from "../../enums/inputTypes.enum";
import { IProductsRequest, IProductsResponse } from "../../store/models/products.model";
import FirestoreService from "../Firestore/Firestore.service";

class ProductsService extends FirestoreService {
  constructor(firestore: Firestore) {
    super(firestore);

    this.delete = this.delete.bind(this);
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
        q = query(collection(this.db, PRODUCTS_DATA_BASE_KEY), ...array, startAfter(pagination.lastVisible), limit(pagination.limit));
      } else {
        q = query(collection(this.db, PRODUCTS_DATA_BASE_KEY), startAfter(pagination.lastVisible), limit(pagination.limit));
      }
    } else if (array.length) {
      q = query(collection(this.db, PRODUCTS_DATA_BASE_KEY), ...array, limit(pagination.limit));
    } else {
      q = query(collection(this.db, PRODUCTS_DATA_BASE_KEY), limit(pagination.limit));
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

  public async delete(id: string) {
    await deleteDoc(doc(this.db, PRODUCTS_DATA_BASE_KEY, id));
  }
}

export default ProductsService;