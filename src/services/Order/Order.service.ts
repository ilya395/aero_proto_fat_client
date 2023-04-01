import { DocumentData, Firestore } from "firebase/firestore";
import { IOrder } from "../../store/models/orders.model";
import ItemService from "../base/Item/Item.service";
import { EModelKeys } from "../../types/enums/models.enum";

class OrderService extends ItemService<IOrder> {
  constructor(firestore: Firestore, key: EModelKeys) {
    super(firestore, key);
    this.getOne = this.getOne.bind(this);
  }

  public async getOne(id: string): Promise<DocumentData | IOrder | undefined> { // TODO?
    const response = await super.getOne(id);
    if (!response) {
      return response;
    }
    return {
      ...response,
      deliveryDate: response?.deliveryDate?.toDate(),
    };
    // const docRef = doc(this.db, this.key, id);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   const toData = docSnap.data();
    //   return {
    //     id,
    //     ...toData,
    //     creationDate: toData.creationDate.toDate(),
    //   } as T;
    // }
    // return undefined;
  }
}

export default OrderService;