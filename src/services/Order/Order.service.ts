import { DocumentData, Firestore } from "firebase/firestore";
import { IOrder } from "../../store/models/orders.model";
import { EModelKeys } from "../../types/enums/models.enum";
import { firebaseInstance } from "../firebase/firebase.service";
import BaseItemService from "../base/Item/Item.service";

class OrderService extends BaseItemService<IOrder> {
  constructor(firestore: Firestore, key: EModelKeys) {
    super(firestore, key);
    this.getOne = this.getOne.bind(this);
  }

  public async getOne(id: string): Promise<DocumentData | IOrder | undefined> { // TODO?
    const response = await super.getOne(id);
    if (!response) {
      return response;
    }
    const object = {
      ...response,
      deliveryDate: response?.deliveryDate?.toDate(),
    } as IOrder;

    const customerId = object.customer?.id;
    if (customerId) {
      const userService = new BaseItemService(firebaseInstance.getFirestore(), EModelKeys.Users);
      const response = await userService.getOne(customerId);
      object.customer = response;
    }

    return object;
  }
}

export default OrderService;