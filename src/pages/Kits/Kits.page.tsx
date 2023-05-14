import React, { useEffect } from "react";
import KitsContainer from "../../components/containers/Kits/Kits.container";
import useFilterMethods from "../../components/containers/KitsPanel/hooks/FilterMethods/FilterMethods.hook";
import KitsPanelContainer from "../../components/containers/KitsPanel/KitsPanel.container";
import MainLayout from "../../layouts/Main/Main.layout";
import { useAppDispatch } from "../../store/hooks/store.hook";
import { clearKits } from "../../store/kits/reducers/kits.reducer";

const KitsPage = () => {
  const dispatch = useAppDispatch();
  const { handleUpdate } = useFilterMethods();
  useEffect(() => {
    handleUpdate();
    return () => {
      dispatch(clearKits());
    };
  }, []);
  return (
    <MainLayout>
      <KitsPanelContainer />
      <KitsContainer />
    </MainLayout>
  );
};

export default KitsPage;