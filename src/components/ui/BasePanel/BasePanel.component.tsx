import React, { memo } from "react";
import { Row, Col } from "react-bootstrap";
import { IBasePanelProps } from "./models/BasePanel.model";

const BasePanel = (props: IBasePanelProps) => {
  console.log(props)
  return (
    <Row>
      <Col>
        1
      </Col>
      <Col>
        2
      </Col>
    </Row>
  );
}

export default memo(BasePanel);