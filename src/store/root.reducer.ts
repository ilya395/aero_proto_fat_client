import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { AuthReducer } from "./auth/reducers/auth.reducer";
import { ProductsReducer } from "./products/reducers/products.reducer";
import { ProductsFilterReducer } from "./productsFilter/reducers/productsFilter.reducer";
import { UserReducer } from "./user/reducers/user.reducer";
import { DeleteUserReducer } from "./users/reducers/deleteUser.reducer";
import { UsersReducer } from "./users/reducers/users.reducer";
import { UsersFilterReducer } from "./usersFilter/reducers/usersFilter.reducer";

const RootReducer = combineReducers({
  auth: AuthReducer,
  users: UsersReducer,
  deleteUser: DeleteUserReducer,
  user: UserReducer,
  usersFilter: UsersFilterReducer,
  products: ProductsReducer,
  productsFilter: ProductsFilterReducer,
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