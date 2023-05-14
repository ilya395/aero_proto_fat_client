import React, { memo } from "react";
import { Button } from "react-bootstrap";
import { IFormPanel } from "./models/FormPanel.model";

const FormPanel = memo((props: IFormPanel) => {
  const {
    clearFormHandle,
    saveFormHandle,
    cancelFormHandle,
    children,
  } = props;

  return (
    <div className="base-form">
      <div className="base-form__management-buttons">
        <div className="management-button">
          <Button variant="outline-primary" onClick={clearFormHandle}>
            Очистить форму
          </Button>
        </div>
      </div>
      {children}
      <div className="base-form__management-buttons">
        <div className="management-button">
          <Button variant="primary" onClick={saveFormHandle}>
            Сохранить
          </Button>
        </div>
        <div className="management-button">
          <Button variant="outline-danger" onClick={cancelFormHandle}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
})

export default FormPanel;