import React, { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import { IBaseModalProps } from "./models/BaseModal.model";

const BaseModal = memo((props: IBaseModalProps) => {
  const {
    show,
    closeWord = "Нет",
    handleClose,
    actionWord = "Да",
    handleAction,
    children,
    title,
  } = props;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {
          title && (
            <Modal.Title>{title}</Modal.Title>
          )
        }
      </Modal.Header>
      {
        children && (
          <Modal.Body>
            {children}
          </Modal.Body>
        )
      }
      <Modal.Footer>
        {
          actionWord && (
            <Button variant="primary" onClick={handleAction}>
              {actionWord}
            </Button>
          )
        }
        {
          closeWord && (
            <Button variant="secondary" onClick={handleClose}>
              {closeWord}
            </Button>
          )
        }
      </Modal.Footer>
    </Modal>
  );
});

export default BaseModal