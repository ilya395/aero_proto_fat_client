import React, { memo } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { IBasePanelProps } from "./models/BasePanel.model";
import s from "./BasePanel.module.scss";

const BasePanel = memo((props: IBasePanelProps) => {
  const {
    handleCallFilter,
    handleCreate,
    handleUpdate,
  } = props;
  return (
    <Row className="pt-4">
      <Col>
        <Button variant="primary" onClick={handleCreate}>Создать</Button>
        <Button variant="outline-primary ms-2" onClick={handleUpdate}>Обновить</Button>
      </Col>
      <Col className={s["panel-column_left"]}>
        <Button variant="primary" onClick={handleCallFilter}>Фильтр</Button>
      </Col>
    </Row>
  );
})

export default BasePanel;