import React, { useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import useProductFormConfig from "../../../hooks/ui/productFormConfig/productFormConfig.hook";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { getProduct, putProduct, updateProduct } from "../../../store/product/action-creators/product.action-creator";
import { addNewProductAction, resetProductDataAction } from "../../../store/product/reducers/product.reducer";
import FormPanel from "../../views/FormPanel/FormPanel.view";
import BaseForm from "../../ui/BaseForm/BaseForm.ui";

const ProductContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id, } = params;

  // business
  const {
    config,
    productDiameter,
    productMaterial,
    productName,
    productPrice,
    productCreationDate,
    productPurchasePrice,
    productQuantity,
    redirectId,
  } = useProductFormConfig();

  const isNew = useMemo(() => !id, [id]);

  useEffect(() => {
    if (id) {
      dispatch(getProduct({
        id,
      }));
      return
    }
    dispatch(addNewProductAction());
  }, [dispatch, id]);

  useEffect(() => {
    if (isNew && redirectId) {
      navigate(`${ENavigationKeys.Products}/${redirectId}`);
    }
  }, [isNew, navigate, redirectId]);

  const clearFormHandle = useCallback(() => dispatch(resetProductDataAction()), [dispatch]);

  const saveDataHandle = useCallback(() => {
    isNew
    ? dispatch(putProduct({
        id,
        diameter: productDiameter,
        material: productMaterial,
        name: productName,
        price: productPrice,
        creationDate: productCreationDate,
        purchasePrice: productPurchasePrice,
        quantity: productQuantity,
      }))
    : dispatch(updateProduct({
        id,
        diameter: productDiameter,
        material: productMaterial,
        name: productName,
        price: productPrice,
        creationDate: productCreationDate,
        purchasePrice: productPurchasePrice,
        quantity: productQuantity,
    }))
  },
  [dispatch, id, isNew, productCreationDate, productDiameter, productMaterial, productName, productPrice, productPurchasePrice, productQuantity]);

  const returnHandle = useCallback(() => {
    navigate(ENavigationKeys.Products);
    clearFormHandle();
  }, [clearFormHandle, navigate]);

  return (
    <FormPanel
      clearFormHandle={clearFormHandle}
      saveFormHandle={saveDataHandle}
      cancelFormHandle={returnHandle}
    >
      <BaseForm
        config={config}
        col={false}
      />
    </FormPanel>
  );
}

export default ProductContainer