import { createAsyncThunk } from "@reduxjs/toolkit";
import { EBaseErrorTitles } from "../../../types/enums/errors.enum";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import ProductsService from "../../../services/Products/Products.service";
import { IProductsRequest } from "../../models/products.model";
import ProductService from "../../../services/Product/Producr.service";

export const filterProductsList = createAsyncThunk(
  "products/filter",
  async (object: IProductsRequest, thunkAPI) => {
    try {
      const productsService = new ProductsService(firebaseInstance.getFirestore());

      const data = await productsService.filter(object);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetProductsList,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetProductsList,
      });
    }
  },
);

export const filterNextProductsList = createAsyncThunk(
  "products/filterNext",
  async (object: IProductsRequest, thunkAPI) => {
    try {
      const productsService = new ProductsService(firebaseInstance.getFirestore());

      const data = await productsService.filter(object);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetProductsList,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetProductsList,
      });
    }
  },
);

export const fetchDeleteProduct = createAsyncThunk(
  "products/deleteOneProduct",
  async (object: { id: string; collection?: string; }, thunkAPI) => {
    try {
      const {
        id,
      } = object;

      const productService = new ProductService(firebaseInstance.getFirestore());

      await productService.delete(id);

      return true;

      // return thunkAPI.rejectWithValue({
      //   message: EBaseErrorTitles.FailDeleteUser,
      // });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailRequestDeleteUser,
      });
    }
  },
);