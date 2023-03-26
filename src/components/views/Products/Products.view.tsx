import React from "react";
import { Col, Row } from "react-bootstrap";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import useModalMoveInList from "../../../hooks/ui/modalMoveInList/modalMoveInList.hook";
import { IProductsViewProps } from "./models/Products.model";
import BaseCard from "../../ui/BaseCard/BaseCard.ui";
import BaseModal from "../../ui/BaseModal/BaseModal.ui";

const ProductsView = (props: IProductsViewProps) => {
  const {
    products,
    deleteCallback,
    callbackRefToLastElement,
  } = props;

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
      <Row className="customers-list pt-4">
        {
          products?.map((item, index) => {
            if (products.length - 1 === index) {
              return (
                <Col xs={12} sm={6} lg={4} key={item?.id} ref={callbackRefToLastElement} className="mt-3">
                  <BaseCard
                    title={item?.name}
                    description={`Кол-во: ${item?.quantity || "-"}; Стоимость: ${item?.price || "-"}`}
                    id={item.id}
                    path={ENavigationKeys.Products}
                    deleteCallback={handleShowModal}
                  />
                </Col>
              );
            }
            return (
              <Col xs={12} sm={6} lg={4} key={item?.id} className="mt-3">
                <BaseCard
                  title={item?.name}
                  description={`Кол-во: ${item?.quantity || "-"}; Стоимость: ${item?.price || "-"}`}
                  id={item.id}
                  path={ENavigationKeys.Products}
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
}

export default ProductsView;