import React, { memo } from "react";
import { Col, Row } from "react-bootstrap";
import CustomerCard from "../CustomerCard/CustomerCard.component";
import { ICustomersViewProps } from "./models/CustomersView.model";

const CustomersView = (props: ICustomersViewProps) => {
  const {
    customers,
    deleteCallback,
  } = props;

  return (
    <Row className="customers-list pt-4" >
      {
        customers?.map(item => (
          <Col key={item?.id}>
            <CustomerCard
              {...item}
              deleteCallback={deleteCallback}
            />
          </Col>
        ))
      }
    </Row>
  );
}

export default memo(CustomersView);