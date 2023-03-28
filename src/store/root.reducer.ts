import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./auth/reducers/auth.reducer";
import { KitReducer } from "./kit/reducers/kit.reducer";
import { KitsReducer } from "./kits/reducers/kits.reducer";
import { KitsFilterReducer } from "./kitsFilter/reducers/kitsFilter.reducer";
import { OrdersReducer } from "./orders/reducers/orders.reducer";
import { OrdersFilterReducer } from "./ordersFilter/reducers/ordersFilter.reducer";
import { ProductReducer } from "./product/reducers/product.reducer";
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
  product: ProductReducer,
  kits: KitsReducer,
  kitsFilter: KitsFilterReducer,
  kit: KitReducer,
  orders: OrdersReducer,
  ordersFilter: OrdersFilterReducer,
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