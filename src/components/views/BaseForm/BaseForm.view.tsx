import React, { Fragment, memo } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { IBaseFormProps } from "./models/BaseForm.model";

const BaseForm = memo((props: IBaseFormProps) => {
  const {
    config,
    col = {
      xs: 12,
      sm: 6,
      xl: 4,
    },
  } = props;

  if (!col) {
    return (
      <Form>
        <Row>
          {
            config?.list?.map(item => (
              <Fragment key={item.id}>
                {item.component}
              </Fragment>
            ))
          }
        </Row>
      </Form>
    );
  }

  return (
    <Form>
      <Row>
        {
          config?.list?.map(item => (
            <Col xs={col.xs} sm={col.sm} xl={col.xl} key={item.id}>
              {item.component}
            </Col>
          ))
        }
      </Row>
    </Form>
  );
});

export default BaseForm;