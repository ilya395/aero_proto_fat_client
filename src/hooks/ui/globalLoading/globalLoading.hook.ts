import { useMemo } from "react";
import { useSelector } from "react-redux";
import { kitAwaitSelector } from "../../../store/kit/reducers/kit.reducer";
import { kitsAwaitSelector } from "../../../store/kits/reducers/kits.reducer";
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
  const kitsAwait = useSelector(kitsAwaitSelector);
  const kitAwait = useSelector(kitAwaitSelector);

  const globalLoading = useMemo(() =>
    loading
    || usersAwait
    || userAwait
    || productsAwait
    || productAwait
    || kitsAwait
    || kitAwait,
  [kitAwait, kitsAwait, loading, productAwait, productsAwait, userAwait, usersAwait]);

  return { globalLoading };
};

export default useGlobalLoading;