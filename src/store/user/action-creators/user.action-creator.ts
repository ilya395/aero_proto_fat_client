import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { EBaseErrorTitles } from "../../../enums/errors.enum";
import { firebaseInstance } from "../../../services/firebase/firebase.service";
import { IUser } from "../../models/users.model";

export const fetchUser = createAsyncThunk(
  "user/fetchOneUser",
  async (object: {id: string;}, thunkAPI) => {
    try {
      const {
        id,
      } = object;
      const docRef = doc(firebaseInstance.getFirestore(), "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
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
      const docRef = await addDoc(collection(firebaseInstance.getFirestore(), "/users"), user);
      console.log(docRef)
      return true;
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
      const {
        id,
        ...rest
      } = user;
      if (id) {
        const docRef = doc(firebaseInstance.getFirestore(), "users", id);
        const response = await setDoc(docRef, rest, { merge: true }); // ?
        console.log(response)
        return true;
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