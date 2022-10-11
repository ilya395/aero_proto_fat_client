import { createAsyncThunk } from "@reduxjs/toolkit";
import { EBaseErrorTitles } from "../../../enums/errors.enum";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import ProductService from "../../../services/Product/Producr.service";
import { IProduct } from "../../models/products.model";

export const getProduct = createAsyncThunk(
  "product/get",
  async (object: { id: string }, thunkAPI) => {
    try {
      const {
        id,
      } = object;

      const productService = new ProductService(firebaseInstance.getFirestore());

      const data = await productService.getProduct(id);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetProduct,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetProduct,
      });
    }
  },
);

export const putProduct = createAsyncThunk(
  "product/put",
  async (object: IProduct, thunkAPI) => {
    try {
      const productService = new ProductService(firebaseInstance.getFirestore());

      const data = await productService.createProduct(object);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailPutProduct,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailPutProduct,
      });
    }
  },
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (object: IProduct, thunkAPI) => {
    try {
      const productService = new ProductService(firebaseInstance.getFirestore());

      const data = await productService.updateProduct(object);
      console.log(data)
      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailUpdateProduct,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailUpdateProduct,
      });
    }
  },
);