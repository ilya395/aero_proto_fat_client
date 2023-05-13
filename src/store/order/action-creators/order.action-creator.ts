import { createAsyncThunk } from "@reduxjs/toolkit";
import { DocumentData, DocumentReference } from "firebase/firestore";
import OrderService from "../../../services/Order/Order.service";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import { EModelKeys } from "../../../types/enums/models.enum";
import { EBaseErrorTitles } from "../../../types/enums/errors.enum";
import { IOrder } from "../../models/orders.model";
import UserService from "../../../services/User/User.service";
import { IUser } from "../../models/users.model";
import BaseItemService from "../../../services/base/Item/Item.service";
import KitService from "../../../services/Kit/Kit.service";

export const getOrder = createAsyncThunk(
  "order/get",
  async (object: { id: string }, thunkAPI) => {
    try {
      const {
        id,
      } = object;

      const orderService = new OrderService(firebaseInstance.getFirestore(), EModelKeys.Orders);

      const data = await orderService.getOne(id);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetOrder,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetOrder,
      });
    }
  },
);

export const putOrder = createAsyncThunk(
  "order/put",
  async (object: IOrder, thunkAPI) => {
    try {
      const { customer } = object;

      const userService = new UserService(firebaseInstance.getFirestore());

      let customerModel = null as null | IUser;

      if (customer) {
        if (customer?.id) {
          const res = await userService.updateOne(customer);
          customerModel = res ?? null;
        } else {
          const res = await userService.createOne(customer);
          customerModel = {
            id: res,
          } ?? null;
        }
      }

      const orderService = new OrderService(firebaseInstance.getFirestore(), EModelKeys.Orders);

      const customerService = new BaseItemService(firebaseInstance.getFirestore(), EModelKeys.Users);

      const kitService = new KitService(firebaseInstance.getFirestore(), EModelKeys.Kits);

      const order = object.order?.filter((item) => item.id) as Array<Omit<IOrder, 'id'> & {id: string}>;

      // чтобы положить в бд модкль со всеми полями...
      const dataObject: Omit<Required<IOrder>, 'customer' | 'order'> & { customer: DocumentReference<DocumentData> | null; order: Array<DocumentReference<DocumentData>> | null } = {
        ...object,
        id: object.id ?? null,
        deliveryDate: object.deliveryDate ?? null,
        price: object.price ?? null,
        comment: object.comment ?? null,
        order: order.map((item) => kitService.getDocRef(item.id)) ?? null,
        creationDate: object.creationDate ?? null,
        customer: customerModel?.id ? customerService.getDocRef(customerModel.id) : null, // customerModel,
      };

      const data = await orderService.createOne(dataObject);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailPutOrder,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailPutOrder,
      });
    }
  },
);

export const updateOrder = createAsyncThunk(
  "order/update",
  async (object: IOrder, thunkAPI) => {
    try {
      const { customer, order } = object;

      const userService = new UserService(firebaseInstance.getFirestore());

      let customerModel = null as null | IUser;

      if (customer) {
        if (customer?.id) {
          const res = await userService.updateOne(customer);
          customerModel = res ?? null;
        } else {
          const res = await userService.createOne(customer);
          customerModel = {
            id: res,
          } ?? null;
        }
      }

      const orderService = new OrderService(firebaseInstance.getFirestore(), EModelKeys.Orders);

      const customerService = new BaseItemService(firebaseInstance.getFirestore(), EModelKeys.Users);

      const kitService = new KitService(firebaseInstance.getFirestore(), EModelKeys.Kits);

      const data = await orderService.updateOne({
        ...object,
        order: order?.filter((item) => item.id).map((item) => item.id && kitService.getDocRef(item.id)),
        customer: customerModel?.id ? customerService.getDocRef(customerModel.id) : null, // customerModel,
      } as Omit<IOrder, 'customer'>);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailUpdateOrder,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailUpdateOrder,
      });
    }
  },
);