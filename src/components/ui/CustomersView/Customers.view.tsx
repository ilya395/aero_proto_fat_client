import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import CustomerCard from "../CustomerCard/CustomerCard.component";
import { ICustomersViewProps } from "./models/CustomersView.model";

const CustomersView = (props: ICustomersViewProps) => {
  const {
    customers,
  } = props;

  return (
    <Row className="customers-list">
      {
        customers?.map(item => (
          <Col key={item?.id}>
            <CustomerCard {...item} />
          </Col>
        ))
      }
    </Row>
  );
}

export default memo(CustomersView);