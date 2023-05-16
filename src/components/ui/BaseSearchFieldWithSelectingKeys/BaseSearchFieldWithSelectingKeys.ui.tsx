import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import BaseSearchField from "../BaseSearchField/BaseSearchField.ui";
import { IBaseSearchFieldWithSelectingKeysProps } from "./models/BaseSearchFieldWithSelectingKeys.model";

const BaseSearchFieldWithSelectingKeys = <T extends Record<string, any>, >(props: IBaseSearchFieldWithSelectingKeysProps<T>) => {
  const { keys, currentKey, onChooseKey, id, label, className = "mb-3", ...rest } = props;
  return (
    <Row className={`align-items-end ${className}`}>
      <Col xs={3}>
        <Form.Label htmlFor={id}>{label}</Form.Label>
        <Form.Select aria-label="Select keys" onChange={onChooseKey} value={currentKey}>
          {
            keys.map((item) => (<option key={item.value} value={item.value}>{item.label}</option>))
          }
        </Form.Select>
      </Col>
      <Col xs={9}>
        <BaseSearchField
          id={id}
          label=""
          className="mb-0"
          {...rest}
        />
      </Col>
    </Row>
  );
}

export default BaseSearchFieldWithSelectingKeys;
