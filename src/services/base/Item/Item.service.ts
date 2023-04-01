import { addDoc, collection, deleteDoc, doc, DocumentData, Firestore, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { IBaseCreationDate, IBaseId } from "../../../store/models/base.model";
import { EModelKeys } from "../../../types/enums/models.enum";
import FirestoreService from "../../Firestore/Firestore.service";

class BaseItemService<T extends IBaseId & IBaseCreationDate> extends FirestoreService {
  key: EModelKeys;

  constructor(firestore: Firestore, key: EModelKeys) {
    super(firestore);
    this.key = key;
    this.getOne = this.getOne.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  public async getOne(id: string): Promise<T | DocumentData | undefined> { // TODO?
    const docRef = doc(this.db, this.key, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const toData = docSnap.data();
      return {
        id,
        ...toData,
        creationDate: toData.creationDate.toDate(),
      } as T | DocumentData;
    }
    return undefined;
  }

  public async createOne(user: T): Promise<string> {
    const {
      id,
      ...rest
    } = user as T;
    const data = {
      ...rest,
      creationDate: rest.creationDate ? Timestamp.fromDate(new Date(rest.creationDate)) : Timestamp.fromDate(new Date()),
    };
    const docRef = await addDoc(collection(this.db, this.key), data);
    return docRef.id;
  }

  public async updateOne(user: T): Promise<T | DocumentData | undefined> { // TODO?
    const {
      id,
      ...rest
    } = user;
    if (id) {
      const docRef = doc(this.db, this.key, id);
      const data = {
        ...rest,
        creationDate: rest.creationDate ? Timestamp.fromDate(new Date(rest.creationDate)) : Timestamp.fromDate(new Date()),
      };
      await setDoc(docRef, data);
      const user = await this.getOne(id);
      return user;
    }
    return undefined;
  }

  public async deleteOne(id: string) {
    await deleteDoc(doc(this.db, this.key, id));
  }
}

export default BaseItemService;