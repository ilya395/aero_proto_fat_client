import React from "react";
import { useNavigate } from "react-router-dom";
import { ENavigationKeys } from "../../../enums/navigation.enum";
import BasePanel from "../../ui/BasePanel/BasePanel.component";

const CustomerPanel = () => {
  const navigate = useNavigate();
  const createNew = () => navigate(`${ENavigationKeys.Customers}/new`);
  return (
    <BasePanel
      handleCreate={createNew}
    />
  );
};

export default CustomerPanel;