import React, { useMemo, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks/store.hook";
import { getKit } from "../../../store/kit/action-creators/kit.action-creator";
import { addNewKitAction } from "../../../store/kit/reducers/kit.reducer";
import { ENavigationKeys } from "../../../types/enums/navigation.enum";
import BaseForm from "../../ui/BaseForm/BaseForm.ui";
import FormPanel from "../../views/FormPanel/FormPanel.view";
import useKitForm from "./hooks/KitForm/KitForm.hook";

const KitContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id, } = params;
  const isNew = useMemo(() => !id, [id]);
  useEffect(() => {
    if (id) {
      dispatch(getKit({
        id,
      }));
      return
    }
    dispatch(addNewKitAction());
  }, [dispatch, id]);

  const {
    config,
    redirectId,
    handleClear,
    handlePut,
    handleUpdate,
    handleReturn,
  } = useKitForm();

  useEffect(() => {
    if (isNew && redirectId) {
      navigate(`${ENavigationKeys.Kits}/${redirectId}`);
    }
  }, [isNew, navigate, redirectId]);

  const handleSaveData = useCallback(() => {
    isNew
    ? handlePut()
    : handleUpdate()
  },
  [handlePut, handleUpdate, isNew]);

  return (
    <FormPanel
      clearFormHandle={handleClear}
      saveFormHandle={handleSaveData}
      cancelFormHandle={handleReturn}
    >
      <BaseForm
        config={config}
        col={false}
      />
    </FormPanel>
  );
}

export default KitContainer;
