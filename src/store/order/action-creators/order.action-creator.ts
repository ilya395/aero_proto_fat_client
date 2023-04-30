import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "../../../services/Order/Order.service";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import { EModelKeys } from "../../../types/enums/models.enum";
import { EBaseErrorTitles } from "../../../types/enums/errors.enum";
import { IOrder } from "../../models/orders.model";
import UserService from "../../../services/User/User.service";
import { IUser } from "../../models/users.model";

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

      const data = await orderService.createOne({
        ...object,
        customer: customerModel,
      });

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

      const data = await orderService.updateOne({
        ...object,
        customer: customerModel,
      });

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