import { DocumentData, DocumentSnapshot, Firestore, Timestamp, getDoc, where } from "firebase/firestore";
import { IOrder, IOrdersFilter } from "../../store/models/orders.model";
import { EModelKeys } from "../../types/enums/models.enum";
import ListService from "../base/List/List.service";
import { IBaseListRequest, IBaseListResponse } from "../../types/models/base.model";
import { EOrdersInputTypeKeys } from "../../types/enums/ordersInputTypes";

class OrdersService extends ListService<IOrdersFilter> {
  constructor(firestore: Firestore, key: EModelKeys) {
    super(firestore, key);
    this.getQueryConstraintList = this.getQueryConstraintList.bind(this);
    this.filter = this.filter.bind(this);
  }

  public getQueryConstraintList(filter: IOrdersFilter) {
    const collectionKeysWeHave: [string, any][] = Object.entries(filter);
    return collectionKeysWeHave.map(item => {
      if (item[0] === EOrdersInputTypeKeys.DeliveryDayFrom) {
        return where(EOrdersInputTypeKeys.DeliveryDay, ">=", Timestamp.fromDate(new Date(item[1])));
      }
      if (item[0] === EOrdersInputTypeKeys.DeliveryDayTo) {
        return where(EOrdersInputTypeKeys.DeliveryDay, "<=", Timestamp.fromDate(new Date(item[1])));
      }
      return where(item[0], "==", item[1]);
    });
  }

  public async filter(object: IBaseListRequest<IOrdersFilter>): Promise<IBaseListResponse<IOrder> | undefined> {
    const data = await super.filter(object);
    if (data) {
      const { response = [], ...rest } = data;

      const responseWithNormalCustomers: Array<DocumentData> = [];
      for (const i of response) {
        if (i.customer) {
          // eslint-disable-next-line no-await-in-loop
          const customerData: DocumentSnapshot<any> = await getDoc(i.customer); // oh, lol...
          if (customerData.exists()) {
            const newData = {
              ...i,
              customer: {
                id: customerData.id,
                ...customerData.data(),
                creationDate: customerData.data().creationDate.toDate(),
              },
            };
            responseWithNormalCustomers.push(newData);
          }
        }
      }

      const responseWithNormalOrders: Array<DocumentData> = [];
      for (const i of responseWithNormalCustomers) {
        if (i.order) {
          const normalOrders: Array<DocumentData> = [];
          for (const j of i.order) {
            // eslint-disable-next-line no-await-in-loop
            const orderData: DocumentSnapshot<any> = await getDoc(j); // oh, lol...
            if (orderData.exists()) {
              const newOrderData = {
                id: orderData.id,
                ...orderData.data(),
                creationDate: orderData.data().creationDate.toDate(),
              };
              normalOrders.push(newOrderData);
            }
          }
          const newData = {
            ...i,
            order: normalOrders,
          };
          responseWithNormalOrders.push(newData);
        }
      }
      return {
        response: responseWithNormalOrders,
        ...rest
      };
    }
    return data;
  }
}

export default OrdersService;