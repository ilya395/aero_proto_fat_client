import { createAsyncThunk } from "@reduxjs/toolkit";
import { EBaseErrorTitles } from "../../../types/enums/errors.enum";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import UsersService from "../../../services/Users/Users.service";
import { IUsersRequest } from "../../models/users.model";
import UserService from "../../../services/User/User.service";

export const fetchUsersList = createAsyncThunk(
  "users/fetchAll",
  async (object: IUsersRequest, thunkAPI) => {
    try {
      const usersService = new UsersService(firebaseInstance.getFirestore());
      const data = await usersService.filter(object);
      if (data) {
        return data;
      }
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetUsersList,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetUsersList,
      });
    }
  },
);

export const fetchNextUsersList = createAsyncThunk(
  "users/fetchNext",
  async (object: IUsersRequest, thunkAPI) => {
    try {
      const usersService = new UsersService(firebaseInstance.getFirestore());
      const data = await usersService.filter(object);
      if (data) {
        return data;
      }
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetUsersList,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetUsersList,
      });
    }
  },
);

export const updateUsersList = createAsyncThunk(
  "users/updateAll",
  async (object: IUsersRequest, thunkAPI) => {
    try {
      const usersService = new UsersService(firebaseInstance.getFirestore());
      const data = await usersService.filter(object);
      if (data) {
        return data;
      }
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetUsersList,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetUsersList,
      });
    }
  },
);

export const fetchDeleteUser = createAsyncThunk(
  "users/deleteOneUser",
  async (object: { id: string; collection?: string; }, thunkAPI) => {
    try {
      const {
        id,
      } = object;
      const userService = new UserService(firebaseInstance.getFirestore());
      await userService.deleteOne(id);
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