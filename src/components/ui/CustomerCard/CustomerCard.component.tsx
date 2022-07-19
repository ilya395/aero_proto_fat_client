import React, { memo, useCallback } from "react";
import { Card } from "react-bootstrap";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";
import { useNavigate } from "react-router-dom";
import { ENavigationKeys } from "../../../enums/navigation.enum";
import { ICustomerCardProps } from "./models/CustomerCard.model";

const CustomerCard = (props: ICustomerCardProps) => {
  const {
    name,
    phone,
    address,
    id,
  } = props;

  const navigate = useNavigate();

  const handleClick = useCallback((event: React.MouseEvent<BsPrefixRefForwardingComponent<"a", unknown> | any>) => {
    event.preventDefault();
    id && navigate(`${ENavigationKeys.Customers}/${id}`);
  }, [id, navigate]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{phone || "-"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{name || "-"}</Card.Subtitle>
        <Card.Text>
          {address || "-"}
        </Card.Text>
        <Card.Link onClick={handleClick}>Перейти</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default memo(CustomerCard);