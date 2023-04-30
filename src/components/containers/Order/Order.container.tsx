import React, { useMemo, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { getOrder } from "../../../store/order/action-creators/order.action-creator";
import { addNewOrderAction } from "../../../store/order/reducers/order.reducer";
import useOrderForm from "./hooks/OrderForm/OrderForm.hook";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import FormPanel from "../../views/FormPanel/FormPanel.view";
import BaseForm from "../../ui/BaseForm/BaseForm.ui";
import useOrderCustomer from "./hooks/OrderCustomer/OrderCustomer.hook";

const OrderContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id, } = params;
  const isNew = useMemo(() => !id, [id]);
  useEffect(() => {
    if (id) {
      dispatch(getOrder({
        id,
      }));
      return
    }
    dispatch(addNewOrderAction());
  }, [dispatch, id]);

  const {
    config,
    redirectId,
    handleClear,
    handlePut,
    handleUpdate,
    handleReturn,
  } = useOrderForm();

  const {
    config: customerFormConfig,
  } = useOrderCustomer();

  useEffect(() => {
    if (isNew && redirectId) {
      navigate(`${ENavigationKeys.Orders}/${redirectId}`);
    }
  }, [isNew, navigate, redirectId]);

  const handleSaveData = useCallback(() => {
    isNew
    ? handlePut()
    : handleUpdate()
  },
  [handlePut, handleUpdate, isNew]);

  return (
    <FormPanel
      clearFormHandle={handleClear}
      saveFormHandle={handleSaveData}
      cancelFormHandle={handleReturn}
    >
    <Tabs
      defaultActiveKey="main"
      id="order-form-tabs"
      className="mb-3"
    >
      <Tab eventKey="main" title="Основные">
        <BaseForm
          config={config}
          col={false}
        />
      </Tab>
      <Tab eventKey="customer" title="Покупатель">
        <BaseForm
          config={customerFormConfig}
          col={false}
        />
      </Tab>
      <Tab eventKey="product" title="Товар">
        Tab content for product
      </Tab>
    </Tabs>
    </FormPanel>
  );
}

export default OrderContainer;
