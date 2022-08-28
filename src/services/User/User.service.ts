import { addDoc, collection, doc, Firestore, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { IUser } from "../../store/models/users.model";
import FirestoreService from "../Firestore/Firestore.service";

class UserService extends FirestoreService {
  constructor(firestore: Firestore) {
    super(firestore);
    this.getOne = this.getOne.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
  }

  public async getOne(id: string): Promise<IUser | undefined> {
    const docRef = doc(this.db, "users", id);
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
      name: rest.name || "",
      phone: rest.phone || "",
      email: rest.email || "",
      address: rest.address || "",
      creationDate: rest.creationDate ? Timestamp.fromDate(new Date(rest.creationDate)) : Timestamp.fromDate(new Date()),
    };
    const docRef = await addDoc(collection(this.db, "users"), data);
    return docRef.id;
  }

  public async updateOne(user: IUser) {
    const {
      id,
      ...rest
    } = user;
    if (id) {
      const docRef = doc(this.db, "users", id);
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
}

export default UserService;