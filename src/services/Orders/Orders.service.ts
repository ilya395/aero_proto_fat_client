import { IOrder } from "../../store/models/orders.model";
import ListService from "../base/List/List.service";

class OrdersService extends ListService<IOrder> {}

export default OrdersService;