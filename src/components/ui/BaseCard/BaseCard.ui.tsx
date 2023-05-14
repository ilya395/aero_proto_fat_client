import React, { memo, useCallback } from "react";
import { Card } from "react-bootstrap";
import { BsPrefixRefForwardingComponent } from "react-bootstrap/esm/helpers";
import { useNavigate } from "react-router-dom";
import { IBaseCardProps } from "./models/BaseCard.model";
import DeleteIcon from "../icons/DeleteIcon/DeleteIcon.ui";

const BaseCard = memo((props: IBaseCardProps) => {
  const {
    title,
    subTitle,
    description,
    path,
    id,
    deleteCallback,
  } = props;

  const navigate = useNavigate();

  const handleClick = useCallback((event: React.MouseEvent<BsPrefixRefForwardingComponent<"a", unknown> | any>) => {
    event.preventDefault();
    id && path && navigate(`${path}/${id}`);
  }, [id, path, navigate]);

  const handleDelete = useCallback((event: React.MouseEvent<BsPrefixRefForwardingComponent<"a", unknown> | any>) => {
    event.preventDefault();
    id && deleteCallback?.(id);
  }, [deleteCallback, id]);

  return (
    <Card>
      <Card.Body>
        {
          title && <Card.Title>{title}</Card.Title>
        }
        {
          subTitle && <Card.Subtitle className="mb-2 text-muted">{subTitle}</Card.Subtitle>
        }
        {
          description && <Card.Text>{description}</Card.Text>
        }
        <div className="card-footer">
          <Card.Link onClick={handleClick}>Перейти</Card.Link>
          <Card.Link onClick={handleDelete}>
            <DeleteIcon />
          </Card.Link>
        </div>
      </Card.Body>
    </Card>
  );
})

export default BaseCard;