// import { createAsyncThunk } from "@reduxjs/toolkit";
// import UserService from "../../../services/User/User.service";
// import { IUsersFilter } from "../../models/users.model";

// eslint-disable-next-line import/prefer-default-export
// export const fetchUsersFilter = createAsyncThunk(
//   "usersFilter/fetchUsersFilter ",
//   async (object: IUsersFilter, thunkAPI) => {
//     try {
//       const {
//         id,
//       } = object;
//       const userService = new UserService(firebaseInstance.getFirestore());
//       const data = await userService.getOne(id);
//       if (data) {
//         return data;
//       }
//       return thunkAPI.rejectWithValue({
//         message: EBaseErrorTitles.FailUndefinedUser,
//       });
//     } catch (e) {
//       return thunkAPI.rejectWithValue({
//         message: EBaseErrorTitles.FailFetchUser,
//       });
//     }
//   },
// );