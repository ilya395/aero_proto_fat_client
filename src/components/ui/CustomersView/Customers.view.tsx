import React, { memo, useCallback, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BaseCard from "../BaseCard/BaseCard.component";
import BaseModal from "../BaseModal/BaseModal.component";
import { ICustomersViewProps } from "./models/CustomersView.model";
import { ENavigationKeys } from "../../../enums/navigation.enum";

const CustomersView = (props: ICustomersViewProps) => {
  const {
    customers,
    deleteCallback,
  } = props;

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
          customers?.map(item => (
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
          ))
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
}

export default memo(CustomersView);