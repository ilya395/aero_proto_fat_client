import { createAsyncThunk } from "@reduxjs/toolkit";
import { EBaseErrorTitles } from "../../../types/enums/errors.enum";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import UserService from "../../../services/User/User.service";
import { IUser } from "../../models/users.model";

export const fetchOneUser = createAsyncThunk(
  "user/fetchOneUser",
  async (object: { id: string; }, thunkAPI) => {
    try {
      const {
        id,
      } = object;
      const userService = new UserService(firebaseInstance.getFirestore());
      const data = await userService.getOne(id);
      if (data) {
        return data;
      }
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailUndefinedUser,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailFetchUser,
      });
    }
  },
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (object: {user: IUser}, thunkAPI) => {
    try {
      const {
        user,
      } = object;
      const userService = new UserService(firebaseInstance.getFirestore());
      const redirectId = await userService.createOne(user);
      if (redirectId) {
        return redirectId;
      }
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailDateUser,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailCreateUser,
      });
    }
  },
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (object: {user: IUser}, thunkAPI) => {
    try {
      const {
        user,
      } = object;
      const userService = new UserService(firebaseInstance.getFirestore());
      const data = await userService.updateOne(user);
      if (data) {
        return data;
      }
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailDateUser,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailUpdateUser,
      });
    }
  },
);