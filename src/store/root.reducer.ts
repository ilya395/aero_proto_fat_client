import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { AuthReducer } from "./auth/reducers/auth.reducer";
import { DeleteUserReducer, UsersReducer } from "./users/reducers/users.reducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  users: UsersReducer,
  deleteUser: DeleteUserReducer,
});

export const setupStore = () => configureStore({
  reducer: RootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type RootState = ReturnType<typeof RootReducer>; // тип состояния
export type AppStore = ReturnType<typeof setupStore>; // тип стора
export type AppDispatch = AppStore["dispatch"];