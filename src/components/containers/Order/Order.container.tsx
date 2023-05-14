import React, { useMemo, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Figure, ListGroup, Row, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { getOrder } from "../../../store/order/action-creators/order.action-creator";
import { addNewOrderAction, deleteOrderKitAction, orderOrdersMemoSelector } from "../../../store/order/reducers/order.reducer";
import useOrderForm from "./hooks/OrderForm/OrderForm.hook";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import FormPanel from "../../views/FormPanel/FormPanel.view";
import BaseForm from "../../ui/BaseForm/BaseForm.ui";
import useOrderCustomer from "./hooks/OrderCustomer/OrderCustomer.hook";
import DeleteIcon from "../../ui/icons/DeleteIcon/DeleteIcon.ui";
import useOrderKits from "./hooks/OrderKits/OrderKits.hook";
import { IKit } from "../../../store/models/kits.model";

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

  const order = useSelector(orderOrdersMemoSelector);

  const { config: orderFormConfig } = useOrderKits();

  const deleteKitHandle = useCallback((arg: IKit) => () => dispatch(deleteOrderKitAction(arg)), [dispatch]);

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
        <BaseForm
          config={orderFormConfig}
          col={false}
        />
        <ListGroup>
          {
            order?.map((item) => (<ListGroup.Item key={item.id}>
              <Row>
                <Col xs={11}>
                  <Figure className="mb-0">
                    {
                      item.url ? (
                        <Figure.Image
                          width={150}
                          height={150}
                          alt="150x150"
                          src={item.url ?? ''}
                        />
                      ) : null
                    }
                    <Figure.Caption>
                      {item.kitNumber}, {item.price}
                    </Figure.Caption>
                  </Figure>
                </Col>
                <Col xs={1}>
                  <Button size="sm" variant="outline-primary" onClick={deleteKitHandle(item)}><DeleteIcon /></Button>
                </Col>
              </Row>
            </ListGroup.Item>))
          }
        </ListGroup>
      </Tab>
    </Tabs>
    </FormPanel>
  );
}

export default OrderContainer;
