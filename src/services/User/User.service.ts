import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { IUser } from "../../store/models/users.model";
import { EModelKeys } from "../../types/enums/models.enum";
import FirestoreService from "../Firestore/Firestore.service";

class UserService extends FirestoreService {
  constructor(firestore: Firestore) {
    super(firestore);
    this.getOne = this.getOne.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  public async getOne(id: string): Promise<IUser | undefined> {
    const docRef = doc(this.db, EModelKeys.Users, id);
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

  public async createOne(user: IUser): Promise<string> {
    const {
      id,
      ...rest
    } = user;
    const data = {
      name: rest.name ?? null,
      phone: rest.phone ?? null,
      email: rest.email ?? null,
      address: rest.address ?? null,
      creationDate: rest.creationDate ? Timestamp.fromDate(new Date(rest.creationDate)) : Timestamp.fromDate(new Date()),
    };
    const docRef = await addDoc(collection(this.db, EModelKeys.Users), data);
    return docRef.id;
  }

  public async updateOne(user: IUser): Promise<IUser | undefined> {
    const {
      id,
      ...rest
    } = user;
    if (id) {
      const docRef = doc(this.db, EModelKeys.Users, id);
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
    await deleteDoc(doc(this.db, EModelKeys.Users, id));
  }
}

export default UserService;