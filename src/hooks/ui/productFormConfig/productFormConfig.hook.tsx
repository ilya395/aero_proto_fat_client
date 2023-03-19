import React, { useCallback, useMemo } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IBaseFormConfig } from "../../../components/views/BaseForm/models/BaseForm.model";
import BaseDateTimePicker from "../../../components/views/inputs/BaseDateTimePicker/BaseDateTimePicker.component";
import BaseTextInput from "../../../components/views/inputs/BaseTextInput/BaseTextInput.component";
import { EInputTypeKeys, EInputTypeTitles } from "../../../types/enums/inputTypes.enum";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { IProduct } from "../../../store/models/products.model";
import { changeProductDataAction, productCreationDateMemoSelector, productDiameterMemoSelector, productMaterialMemoSelector, productNameMemoSelector, productPriceMemoSelector, productPurchasePriceMemoSelector, productQuantityMemoSelector, productRedirectIdMemoSelector } from "../../../store/product/reducers/product.reducer";

const useProductFormConfig = () => {
  const dispatch = useAppDispatch();
  const productDiameter = useSelector(productDiameterMemoSelector);
  const productMaterial = useSelector(productMaterialMemoSelector);
  const productName = useSelector(productNameMemoSelector);
  const productPrice = useSelector(productPriceMemoSelector);
  const productCreationDate = useSelector(productCreationDateMemoSelector);
  const productPurchasePrice = useSelector(productPurchasePriceMemoSelector);
  const productQuantity = useSelector(productQuantityMemoSelector);
  const redirectId = useSelector(productRedirectIdMemoSelector);

  const changeHandle = useCallback((arg: IProduct) => dispatch(changeProductDataAction(arg)), [dispatch]);
  const changeNumberHandle = useCallback((arg: IProduct) => {
    const key: keyof IProduct = Object.keys(arg)[0] as keyof IProduct;
    dispatch(changeProductDataAction({
      [key]: Number(arg[key]),
    }));
  }, [dispatch]);

  const name = useMemo(() => ({
    id: "name",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="name-field"
        value={productName}
        callback={changeHandle}
        objectKey={EInputTypeKeys.Name}
        placeholder={EInputTypeTitles.Name}
        label={EInputTypeTitles.Name}
      />
    </Col>,
  }), [changeHandle, productName]);
  const diameter = useMemo(() => ({
    id: "diameter",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="diameter-field"
        value={productDiameter}
        callback={changeHandle}
        objectKey={EInputTypeKeys.Diameter}
        placeholder={EInputTypeTitles.Diameter}
        label={EInputTypeTitles.Diameter}
      />
    </Col>,
  }), [changeHandle, productDiameter]);
  const material = useMemo(() => ({
    id: "material",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="material-field"
        value={productMaterial}
        callback={changeHandle}
        objectKey={EInputTypeKeys.Material}
        placeholder={EInputTypeTitles.Material}
        label={EInputTypeTitles.Material}
      />
    </Col>,
  }), [changeHandle, productMaterial]);
  const price = useMemo(() => ({
    id: "price",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="price-field"
        value={String(productPrice || "")}
        callback={changeNumberHandle}
        objectKey={EInputTypeKeys.Price}
        placeholder={EInputTypeTitles.Price}
        label={EInputTypeTitles.Price}
      />
    </Col>,
  }), [changeNumberHandle, productPrice]);
  const purchasePrice = useMemo(() => ({
    id: "purchasePrice",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="purchasePrice-field"
        value={String(productPurchasePrice || "")}
        callback={changeNumberHandle}
        objectKey={EInputTypeKeys.PurchasePrice}
        placeholder={EInputTypeTitles.PurchasePrice}
        label={EInputTypeTitles.PurchasePrice}
      />
    </Col>,
  }), [changeNumberHandle, productPurchasePrice]);
  const creationDate = useMemo(() => ({
    id: "creationDate",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseDateTimePicker
        id="creation-date-field"
        value={productCreationDate}
        callback={changeHandle}
        objectKey={EInputTypeKeys.CreationDate}
        placeholder={EInputTypeTitles.CreationDate}
        label={EInputTypeTitles.CreationDate}
      />
    </Col>,
  }), [changeHandle, productCreationDate]);
  const quantity = useMemo(() => ({
    id: "quantity",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="quantity-field"
        value={String(productQuantity || "")}
        callback={changeNumberHandle}
        objectKey={EInputTypeKeys.Quantity}
        placeholder={EInputTypeTitles.Quantity}
        label={EInputTypeTitles.Quantity}
      />
    </Col>,
  }), [changeNumberHandle, productQuantity]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      name,
      diameter,
      material,
      price,
      purchasePrice,
      creationDate,
      quantity,
    ],
  }), [creationDate, diameter, material, name, price, purchasePrice, quantity]);

  return {
    config,
    productDiameter,
    productMaterial,
    productName,
    productPrice,
    productCreationDate,
    productPurchasePrice,
    productQuantity,
    redirectId,
  }
}

export default useProductFormConfig;