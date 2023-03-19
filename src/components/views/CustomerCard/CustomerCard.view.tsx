import React, { memo, useCallback } from "react";
import { Card } from "react-bootstrap";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";
import { useNavigate } from "react-router-dom";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import { ICustomerCardProps } from "./models/CustomerCard.model";

const CustomerCard = (props: ICustomerCardProps) => {
  const {
    name,
    phone,
    address,
    id,
    deleteCallback,
  } = props;

  const navigate = useNavigate();

  const handleClick = useCallback((event: React.MouseEvent<BsPrefixRefForwardingComponent<"a", unknown> | any>) => {
    event.preventDefault();
    id && navigate(`${ENavigationKeys.Customers}/${id}`);
  }, [id, navigate]);

  const handleDelete = useCallback((event: React.MouseEvent<BsPrefixRefForwardingComponent<"a", unknown> | any>) => {
    event.preventDefault();
    deleteCallback && id && deleteCallback(id)
  }, [deleteCallback, id]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>{phone || "-"}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{name || "-"}</Card.Subtitle>
        <Card.Text>
          {address || "-"}
        </Card.Text>
        <div className="card-footer">
          <Card.Link onClick={handleClick}>Перейти</Card.Link>
          <Card.Link onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default memo(CustomerCard);