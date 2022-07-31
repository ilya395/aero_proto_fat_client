import React from "react";
import BreadcrumbsView from "../../views/Breadcrumbs/Breadcrumbs.view";
import useRoutePath from "./hooks/Breadcrumbs.hook";

const BreadcrumbsContainer = () => {
  const object = useRoutePath();
  return (
    <BreadcrumbsView
      list={object}
    />
  );
}

export default BreadcrumbsContainer;