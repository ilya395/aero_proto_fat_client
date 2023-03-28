import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import OrderService from "../../../services/Order/Order.service";
import OrdersService from "../../../services/Orders/Orders.service";
import { EBaseErrorTitles } from "../../../types/enums/errors.enum";
import { EModelKeys } from "../../../types/enums/models.enum";
import { IBaseListRequest } from "../../../types/models/base.model";
import { IOrdersFilter } from "../../models/orders.model";

export const fetchOrdersList = createAsyncThunk(
  "orders/fetchAll",
  async (object: IBaseListRequest<IOrdersFilter>, thunkAPI) => {
    try {
      const ordersService = new OrdersService(firebaseInstance.getFirestore(), EModelKeys.Orders);
      const data = await ordersService.filter(object);
      if (data) {
        return data;
      }
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetOrdersList,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetOrdersList,
      });
    }
  },
);

export const fetchDeleteOrder = createAsyncThunk(
  "orders/deleteOneOrder",
  async (object: { id: string; collection?: string; }, thunkAPI) => {
    try {
      const {
        id,
      } = object;
      const orderService = new OrderService(firebaseInstance.getFirestore(), EModelKeys.Orders);
      await orderService.deleteOne(id);
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailRequestDeleteKit,
      });
    }
  },
);