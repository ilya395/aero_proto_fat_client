import { createAsyncThunk } from "@reduxjs/toolkit";
import { EBaseErrorTitles } from "../../../enums/errors.enum";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import ProductsService from "../../../services/Products/Products.service";
import { IProductsRequest } from "../../models/products.model";

// eslint-disable-next-line import/prefer-default-export
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

// export const updateUsersList = createAsyncThunk(
//   "users/updateAll",
//   async (object: IUsersRequest, thunkAPI) => {
//     try {
//       const usersService = new UsersService(firebaseInstance.getFirestore());
//       const data = await usersService.filter(object);
//       if (data) {
//         return data;
//       }
//       return thunkAPI.rejectWithValue({
//         message: EBaseErrorTitles.FailGetUsersList,
//       });
//     } catch (e) {
//       return thunkAPI.rejectWithValue({
//         message: EBaseErrorTitles.FailGetUsersList,
//       });
//     }
//   },
// );

// export const fetchDeleteUser = createAsyncThunk(
//   "users/deleteOneUser",
//   async (object: { id: string; collection?: string; }, thunkAPI) => {
//     try {
//       const {
//         id,
//       } = object;
//       const usersService = new UsersService(firebaseInstance.getFirestore());
//       await usersService.deleteOne(id);
//       return true;

//       // return thunkAPI.rejectWithValue({
//       //   message: EBaseErrorTitles.FailDeleteUser,
//       // });
//     } catch (e) {
//       return thunkAPI.rejectWithValue({
//         message: EBaseErrorTitles.FailRequestDeleteUser,
//       });
//     }
//   },
// );