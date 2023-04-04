import { createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import KitsService from "../../../services/Kits/Kits.service";
import { EModelKeys } from "../../../types/enums/models.enum";
import { IKit, IKitsFilter } from "../../models/kits.model";
import { IBaseListRequest } from "../../../types/models/base.model";
import { EBaseErrorTitles } from "../../../types/enums/errors.enum";
import KitService from "../../../services/Kit/Kit.service";

export const fetchKitsList = createAsyncThunk(
  "kits/fetchAll",
  async (object: IBaseListRequest<IKit | IKitsFilter>, thunkAPI) => {
    try {
      const kitsService = new KitsService(firebaseInstance.getFirestore(), EModelKeys.Kits);
      const data = await kitsService.filter(object);
      if (data) {
        return data;
      }
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetKitsList,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetKitsList,
      });
    }
  },
);

export const fetcNexthKitsList = createAsyncThunk(
  "kits/fetchNext",
  async (object: IBaseListRequest<IKit | IKitsFilter>, thunkAPI) => {
    try {
      const kitsService = new KitsService(firebaseInstance.getFirestore(), EModelKeys.Kits);
      const data = await kitsService.filter(object);
      if (data) {
        return data;
      }
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetKitsList,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailGetKitsList,
      });
    }
  },
);

export const fetchDeleteKit = createAsyncThunk(
  "kits/deleteOneKit",
  async (object: { id: string; collection?: string; }, thunkAPI) => {
    try {
      const {
        id,
      } = object;
      const kitService = new KitService(firebaseInstance.getFirestore(), EModelKeys.Kits);
      await kitService.deleteOne(id);
      return true;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: EBaseErrorTitles.FailRequestDeleteKit,
      });
    }
  },
);
