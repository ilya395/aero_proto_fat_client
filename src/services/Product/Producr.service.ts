import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { IProduct } from "../../store/models/products.model";
import { EModelKeys } from "../../types/enums/models.enum";
import FirestoreService from "../Firestore/Firestore.service";

class ProductService extends FirestoreService {
  constructor(firestore: Firestore) {
    super(firestore);
    this.getProduct = this.getProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  public async getProduct(id: string): Promise<IProduct | undefined> {
    const docRef = doc(this.db, EModelKeys.Products, id);
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
      name: rest.name ?? null,
      price: rest.price ?? null,
      purchasePrice: rest.purchasePrice ?? null,
      quantity: rest.quantity ?? null,
      diameter: rest.diameter ?? null,
      material: rest.material ?? null,
      creationDate: rest.creationDate ? Timestamp.fromDate(new Date(rest.creationDate)) : Timestamp.fromDate(new Date()),
    };
    const docRef = await addDoc(collection(this.db, EModelKeys.Products), data);
    const userData = await this.getProduct(docRef.id);
    return userData;
  }

  public async updateProduct(user: IProduct): Promise<IProduct | undefined> {
    const {
      id,
      ...rest
    } = user;
    if (id) {
      const docRef = doc(this.db, EModelKeys.Products, id);
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

  public async delete(id: string) {
    await deleteDoc(doc(this.db, EModelKeys.Products, id));
  }
}

export default ProductService;