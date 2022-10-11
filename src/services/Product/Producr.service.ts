import { addDoc, collection, doc, Firestore, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { PRODUCTS_DATA_BASE_KEY } from "../../constants/variables.constant";
import { IProduct } from "../../store/models/products.model";
import FirestoreService from "../Firestore/Firestore.service";

class ProductService extends FirestoreService {
  constructor(firestore: Firestore) {
    super(firestore);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  public async getProduct(id: string): Promise<IProduct | undefined> {
    const docRef = doc(this.db, PRODUCTS_DATA_BASE_KEY, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const toData = docSnap.data();
      return {
        id,
        ...toData,
        creationDate: toData.creationDate.toDate(),
      }
    }
    return undefined;
  }

  public async createProduct(user: IProduct): Promise<IProduct | undefined> {
    const {
      id,
      ...rest
    } = user;
    const data = {
      name: rest.name || "",
      price: rest.price || "",
      purchasePrice: rest.purchasePrice || "",
      quantity: rest.quantity || "",
      diameter: rest.diameter || "",
      material: rest.material || "",
      creationDate: rest.creationDate ? Timestamp.fromDate(new Date(rest.creationDate)) : Timestamp.fromDate(new Date()),
    };
    const docRef = await addDoc(collection(this.db, PRODUCTS_DATA_BASE_KEY), data);
    const userData = await this.getProduct(docRef.id);
    return userData;
  }

  public async updateProduct(user: IProduct): Promise<IProduct | undefined> {
    const {
      id,
      ...rest
    } = user;
    if (id) {
      const docRef = doc(this.db, PRODUCTS_DATA_BASE_KEY, id);
      const data = {
        ...rest,
        creationDate: rest.creationDate ? Timestamp.fromDate(new Date(rest.creationDate)) : Timestamp.fromDate(new Date()),
      };
      await setDoc(docRef, data);
      const user = await this.getProduct(id);
      return user;
    }
    return undefined;
  }
}

export default ProductService;