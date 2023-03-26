import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import KitService from "../../../services/Kit/Kit.service";
import { EBaseErrorTitles } from "../../../types/enums/errors.enum";
import { EModelKeys } from "../../../types/enums/models.enum";
import { IKit } from "../../models/kits.model";

export const getKit = createAsyncThunk(
  "kit/get",
  async (object: { id: string }, thunkAPI) => {
    try {
      const {
        id,
      } = object;

      const kitService = new KitService(firebaseInstance.getFirestore(), EModelKeys.Kits);

      const data = await kitService.getOne(id);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetKit,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetKit,
      });
    }
  },
);

export const putKit = createAsyncThunk(
  "kit/put",
  async (object: IKit, thunkAPI) => {
    try {
      const kitService = new KitService(firebaseInstance.getFirestore(), EModelKeys.Kits);

      const data = await kitService.createOne(object);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailPutKit,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailPutKit,
      });
    }
  },
);

export const updateKit = createAsyncThunk(
  "kit/update",
  async (object: IKit, thunkAPI) => {
    try {
      const kitService = new KitService(firebaseInstance.getFirestore(), EModelKeys.Kits);

      const data = await kitService.updateOne(object);

      if (data) {
        return data;
      }

      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailUpdateKit,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailUpdateKit,
      });
    }
  },
);