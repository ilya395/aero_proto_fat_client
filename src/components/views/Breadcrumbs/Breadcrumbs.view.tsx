import React, { memo } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IBreadcrumbsProps } from "./models/Breadcrumbs.model";

const BreadcrumbsView = (props: IBreadcrumbsProps) => {
  const {
    list,
  } = props;
  const navigate = useNavigate();
  const handleNavigate = (path: string) => () => navigate(path);
  return (
    <Breadcrumb className="pt-4">
      {
        list?.map(item => (
          <Breadcrumb.Item
            key={item.path}
            onClick={handleNavigate(item.path)}
            active={item.active}
          >
            {item.title}
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  );
}

export default memo(BreadcrumbsView);