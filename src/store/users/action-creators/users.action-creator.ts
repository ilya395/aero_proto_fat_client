import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, DocumentData, getDocs, query } from "firebase/firestore";
import { EBaseErrorTitles } from "../../../enums/errors.enum";
import { firebaseInstance } from "../../../services/firebase/firebase.service";

// eslint-disable-next-line import/prefer-default-export
export const fetchUsersList = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const q = await query(collection(firebaseInstance.getFirestore(), "/users"));
      const querySnapshot = await getDocs(q);
      const response:Array<DocumentData> = [];
      querySnapshot.forEach((doc) => response.push(doc.data()));
      if (response.length) {
        return response;
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