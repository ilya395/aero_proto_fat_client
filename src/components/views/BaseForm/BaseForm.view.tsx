import React, { Fragment } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IBaseFormProps } from "./models/BaseForm.model";

const BaseForm = (props: IBaseFormProps) => {
  const {
    config,
  } = props;

  return (
    <Form>
      <Row>
        {
          config?.list?.map(item => (
            <Col xs={12} sm={6} xl={4} key={item.id}>
              <Fragment key={item.id}>
                {item.component}
              </Fragment>
            </Col>
          ))
        }
      </Row>
    </Form>
  );
}

export default BaseForm;