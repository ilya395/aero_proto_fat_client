import React, { memo, useCallback, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BaseCard from "../BaseCard/BaseCard.view";
import BaseModal from "../BaseModal/BaseModal.view";
import { ICustomersViewProps } from "./models/CustomersView.model";
import { ENavigationKeys } from "../../../enums/navigation.enum";

const CustomersView = memo((props: ICustomersViewProps) => {
  const {
    customers,
    deleteCallback,
    // callbackRef,
    callbackRefToFirstElement,
    callbackRefToLastElement
  } = props;

  // ui
  const [showDeleteModalId, setShowDeleteModalId] = useState<string | null>(null);
  const handleCloseModal = useCallback(() => setShowDeleteModalId(null), []);
  const handleShowModal = useCallback((id: string) => setShowDeleteModalId(id), []);
  const handleActionModal = useCallback(() => {
    deleteCallback && showDeleteModalId && deleteCallback(showDeleteModalId);
    setShowDeleteModalId(null);
  }, [deleteCallback, showDeleteModalId]);

  return (
    <>
      <Row className="customers-list pt-4" >
        {
          customers?.map((item, index) => {
            if (index === 0) {
              return (
                <Col key={item?.id} ref={callbackRefToFirstElement}>
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
                <Col key={item?.id} ref={callbackRefToLastElement}>
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
              <Col key={item?.id}>
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