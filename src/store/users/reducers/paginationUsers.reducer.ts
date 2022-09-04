// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
// import { RootState } from "../../root.reducer";
// import { IInitialPaginationUsersState } from "../models/paginationUsers.model";

// const initialPaginationUsersState: IInitialPaginationUsersState = {
//   lastVisibleItem: null,
// }

// export const PaginationUsersSlice = createSlice({
//   name: "users",
//   initialState: initialPaginationUsersState,
//   reducers: {
//     updateLastVisibleItemrAction(state, action: PayloadAction<QueryDocumentSnapshot<DocumentData>>) {
//       // eslint-disable-next-line no-param-reassign
//       state.lastVisibleItem = action.payload;
//     },
//     clearLastVisibleItemrAction(state,) {
//       // eslint-disable-next-line no-param-reassign
//       state.lastVisibleItem = null;
//     },
//   },
//   extraReducers: {},
// });

// export const PaginationUsersReducer = PaginationUsersSlice.reducer;

// export const {
//   updateLastVisibleItemrAction,
//   clearLastVisibleItemrAction,
// } = PaginationUsersSlice.actions;

// export const paginationUsersSelector = (state: RootState) => state.usersPagination.lastVisibleItem;