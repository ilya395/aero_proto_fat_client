import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import { ICustomersViewProps } from "./models/CustomersView.model";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import useModalMoveInList from "../../../hooks/ui/modalMoveInList/modalMoveInList.hook";
import BaseCard from "../../ui/BaseCard/BaseCard.ui";
import BaseModal from "../../ui/BaseModal/BaseModal.ui";

const CustomersView = memo((props: ICustomersViewProps) => {
  const {
    customers,
    deleteCallback,
    // callbackRef,
    callbackRefToFirstElement,
    callbackRefToLastElement
  } = props;

  // ui
  const {
    showDeleteModalId,
    handleCloseModal,
    handleShowModal,
    handleActionModal,
  } = useModalMoveInList({
    deleteCallback
  });

  return (
    <>
      <Row className="customers-list pt-4" >
        {
          customers?.map((item, index) => {
            if (index === 0) {
              return (
                <Col xs={12} sm={6} lg={4} key={item?.id} ref={callbackRefToFirstElement} className="mt-3">
                  <BaseCard
                    title={item?.phone}
                    subTitle={item?.name}
                    description={item?.address}
                    id={item.id}
                    path={ENavigationKeys.Customers}
                    deleteCallback={handleShowModal}
                  />
                </Col>
              );
            }
            if (customers.length - 1 === index) {
              return (
                <Col xs={12} sm={6} lg={4} key={item?.id} ref={callbackRefToLastElement} className="mt-3">
                  <BaseCard
                    title={item?.phone}
                    subTitle={item?.name}
                    description={item?.address}
                    id={item.id}
                    path={ENavigationKeys.Customers}
                    deleteCallback={handleShowModal}
                  />
                </Col>
              );
            }
            return (
              <Col xs={12} sm={6} lg={4} key={item?.id} className="mt-3">
                <BaseCard
                  title={item?.phone}
                  subTitle={item?.name}
                  description={item?.address}
                  id={item.id}
                  path={ENavigationKeys.Customers}
                  deleteCallback={handleShowModal}
                />
              </Col>
            );
          })
        }
      </Row>
      <BaseModal
        title="Удалить?"
        show={!!showDeleteModalId}
        handleClose={handleCloseModal}
        handleAction={handleActionModal}
      />
    </>
  );
});

export default CustomersView;