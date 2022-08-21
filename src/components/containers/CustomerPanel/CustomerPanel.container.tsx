import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ENavigationKeys } from "../../../enums/navigation.enum";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { fetchUsersList } from "../../../store/users/action-creators/users.action-creator";
import BasePanel from "../../views/BasePanel/BasePanel.view";

const CustomerPanel = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createNew = useCallback(() => navigate(`${ENavigationKeys.Customers}/new`), [navigate]);
  const handleUpdate = useCallback(() => dispatch(fetchUsersList()), [dispatch]);
  return (
    <BasePanel
      handleCreate={createNew}
      handleUpdate={handleUpdate}
    />
  );
};

export default CustomerPanel;