import { useMemo } from "react";
import { useSelector } from "react-redux";
import { productAwaitSelector } from "../../../store/product/reducers/product.reducer";
import { productsAwaitSelector } from "../../../store/products/reducers/products.reducer";
import { userAwaitSelector } from "../../../store/user/reducers/user.reducer";
import { usersAwaitSelector } from "../../../store/users/reducers/users.reducer";
import useAuth from "../../auth/auth.hook";

const useGlobalLoading = () => {
  const { loading,} = useAuth();
  const usersAwait = useSelector(usersAwaitSelector);
  const userAwait = useSelector(userAwaitSelector);
  const productsAwait = useSelector(productsAwaitSelector);
  const productAwait = useSelector(productAwaitSelector);

  const globalLoading = useMemo(() =>
    loading
    || usersAwait
    || userAwait
    || productsAwait
    || productAwait,
  [loading, productAwait, productsAwait, userAwait, usersAwait]);

  return { globalLoading };
};

export default useGlobalLoading;