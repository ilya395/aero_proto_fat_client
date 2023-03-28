import { IOrder } from "../../store/models/orders.model";
import ItemService from "../base/Item/Item.service";

class OrderService extends ItemService<IOrder> {}

export default OrderService;