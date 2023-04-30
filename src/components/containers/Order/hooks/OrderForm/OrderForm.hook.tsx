import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col } from "react-bootstrap";
import { useAppDispatch } from "../../../../../store/hooks/store.hook";
import { changeOrderDataAction, orderCommentMemoSelector, orderDataSelect, orderDeliveryDateMemoSelector, orderPriceMemoSelector, orderRedirectIdSelector, resetOrderDataAction } from "../../../../../store/order/reducers/order.reducer";
import { IOrder } from "../../../../../store/models/orders.model";
import BaseDateTimePicker from "../../../../ui/BaseDateTimePicker/BaseDateTimePicker.ui";
import { EOrdersInputTypeKeys, EOrdersInputTypeTitles } from "../../../../../types/enums/ordersInputTypes";
import { IBaseFormConfig } from "../../../../ui/BaseForm/models/BaseForm.model";
import BaseTextInput from "../../../../ui/BaseTextInput/BaseTextInput.ui";
import { putOrder, updateOrder } from "../../../../../store/order/action-creators/order.action-creator";
import { ENavigationKeys } from "../../../../../types/enums/navigation.enum";

const useOrderForm = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const orderDeliveryDate = useSelector(orderDeliveryDateMemoSelector);
  const orderComment = useSelector(orderCommentMemoSelector);
  const orderPrice = useSelector(orderPriceMemoSelector);
  // const orderCustomer = useSelector(orderCustomerMemoSelector);

  const redirectId = useSelector(orderRedirectIdSelector);
  const orderData = useSelector(orderDataSelect);

  const changeHandle = useCallback((arg: IOrder) => dispatch(changeOrderDataAction(arg)), [dispatch]);
  const changeNumberHandle = useCallback((arg: IOrder) => {
    const key: keyof IOrder = Object.keys(arg)[0] as keyof IOrder;
    dispatch(changeOrderDataAction({
      [key]: Number(arg[key]),
    }));
  }, [dispatch]);

  const creationDate = useMemo(() => ({
    id: "creation-date",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseDateTimePicker
        id="delivery-date-field"
        value={typeof orderDeliveryDate === 'string' ? new Date(orderDeliveryDate) : (orderDeliveryDate ?? undefined)}
        callback={changeHandle}
        objectKey={EOrdersInputTypeKeys.DeliveryDay}
        placeholder={EOrdersInputTypeTitles.DeliveryDay}
        label={EOrdersInputTypeTitles.DeliveryDay}
      />
    </Col>,
  }), [changeHandle, orderDeliveryDate]);

  const comment = useMemo(() => ({
    id: "comment",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="comment-field"
        value={(orderComment ?? '').toString()}
        callback={changeNumberHandle}
        objectKey={EOrdersInputTypeKeys.Comment}
        placeholder={EOrdersInputTypeTitles.Comment}
        label={EOrdersInputTypeTitles.Comment}
      />
    </Col>,
  }), [changeNumberHandle, orderComment]);
  const price = useMemo(() => ({
    id: "price",
    component: <Col xs={12} sm={6} xl={4}>
      <BaseTextInput
        id="price-field"
        value={(orderPrice ?? '').toString()}
        callback={changeNumberHandle}
        objectKey={EOrdersInputTypeKeys.Price}
        placeholder={EOrdersInputTypeTitles.Price}
        label={EOrdersInputTypeTitles.Price}
      />
    </Col>,
  }), [changeNumberHandle, orderPrice]);

  const config: IBaseFormConfig = useMemo(() => ({
    list: [
      price,
      creationDate,
      comment,
    ],
  }), [comment, creationDate, price]);

  const handleClear = useCallback(() => dispatch(resetOrderDataAction()), [dispatch]);

  const handlePut = useCallback(() => orderData && dispatch(putOrder(orderData)), [dispatch, orderData]);

  const handleUpdate = useCallback(() => orderData && dispatch(updateOrder(orderData)), [dispatch, orderData]);

  const handleReturn = useCallback(() => {
    navigate(ENavigationKeys.Orders);
    handleClear();
  }, [handleClear, navigate]);

  return {
    config,
    redirectId,
    handleClear,
    handlePut,
    handleUpdate,
    handleReturn,
  };
}

export default useOrderForm;