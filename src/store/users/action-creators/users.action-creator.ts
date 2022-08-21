import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, DocumentData, getDocs, query } from "firebase/firestore";
import { EBaseErrorTitles } from "../../../enums/errors.enum";
import { firebaseInstance } from "../../../services/firebase/firebase.service";

export const fetchUsersList = createAsyncThunk(
  "users/fetchAll",
  async (_, thunkAPI) => {
    try {
      const q = query(collection(firebaseInstance.getFirestore(), "users"));
      const querySnapshot = await getDocs(q);
      const response:Array<DocumentData> = [];
      querySnapshot.forEach((doc) => response.push({
        id: doc.id,
        ...doc.data(),
      }));
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

export const fetchDeleteUser = createAsyncThunk(
  "users/deleteOneUser",
  async (object: { id: string; collection?: string; }, thunkAPI) => {
    try {
      const {
        id,
        collection = "users",
      } = object;
      const q = await deleteDoc(doc(firebaseInstance.getFirestore(), collection, id));
      console.log(q)
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