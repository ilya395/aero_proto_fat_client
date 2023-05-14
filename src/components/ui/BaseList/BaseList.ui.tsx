import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import useModalMoveInList from "../../../hooks/ui/modalMoveInList/modalMoveInList.hook";
import { IBaseId } from "../../../store/models/base.model";
import BaseModal from "../BaseModal/BaseModal.ui";
import { IBaseListProps } from "./models/BaseList.model";

const BaseList = <T extends IBaseId,>(props: IBaseListProps<T>) => {
  const { items, deleteCallback, callbackRefToLastElement, cardComponent: Card, path, renderCard } = props;

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
          items?.map((item, index) => {
            if (items.length - 1 === index) {
              return (
                <Col xs={12} sm={6} lg={4} key={item?.id} ref={callbackRefToLastElement} className="mt-3">
                  {
                    Card ? <Card
                      {...item}
                      path={path}
                      deleteCallback={handleShowModal}
                    /> : null
                  }
                  {
                    renderCard ? renderCard({
                      ...item,
                      path,
                      deleteCallback: handleShowModal,
                    }) : null
                  }
                </Col>
              );
            }
            return (
              <Col xs={12} sm={6} lg={4} key={item?.id} className="mt-3">
                {
                  Card ? <Card
                    {...item}
                    path={path}
                    deleteCallback={handleShowModal}
                  /> : null
                }
                {
                  renderCard ? renderCard({
                    ...item,
                    path,
                    deleteCallback: handleShowModal,
                  }) : null
                }
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
};

export default memo(BaseList);
