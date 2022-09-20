import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import useInfiniteScroll from "../../../hooks/infiniteScroll/infiniteScroll.hook";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { IProductsRequest } from "../../../store/models/products.model";
import { fetchDeleteProduct, filterProductsList } from "../../../store/products/action-creators/products.action-creator";
import { productsListSelector, productsPaginationSelector } from "../../../store/products/reducers/products.reducer";
import { productsFilterDataSelector } from "../../../store/productsFilter/reducers/productsFilter.reducer";
import ProductsView from "../../views/Products/Products.view";

const ProductsContainer = () => {
  const dispatch = useAppDispatch();

  const products = useSelector(productsListSelector) || [];

  // business
  const filterFields = useSelector(productsFilterDataSelector);
  const pagination = useSelector(productsPaginationSelector);
  const filterData: IProductsRequest = useMemo(() => ({
    filter: filterFields || {},
    pagination,
  }), [filterFields, pagination]);
  const fetchProducts = useCallback(() => dispatch(filterProductsList(filterData)), [dispatch, filterData]);
  const handleDelete = useCallback(async (id: string) => {
    await dispatch(fetchDeleteProduct({
      id,
    }));
    await fetchProducts();
  }, [dispatch, fetchProducts]);

  // ? отдельный хук для получения при скролле
  const {
    setLastElement,
  } = useInfiniteScroll({
    dataLength: products.length,
    callback: fetchProducts,
  });

  if (!products.length) {
    return (
      <div>
        Нету...
      </div>
    );
  }

  return (
    <ProductsView
      products={products}
      deleteCallback={handleDelete}
      callbackRefToLastElement={setLastElement}
    />
  );
}

export default ProductsContainer;