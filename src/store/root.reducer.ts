import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { AuthReducer } from "./auth/reducers/auth.reducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
});

export const setupStore = () => configureStore({
  reducer: RootReducer
});

export type RootState = ReturnType<typeof RootReducer>; // тип состояния
export type AppStore = ReturnType<typeof setupStore>; // тип стора
export type AppDispatch = AppStore["dispatch"];