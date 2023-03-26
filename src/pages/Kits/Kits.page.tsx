import React from "react";
import KitsContainer from "../../components/containers/Kits/Kits.container";
import KitsPanelContainer from "../../components/containers/KitsPanel/KitsPanel.container";
import MainLayout from "../../layouts/Main/Main.layout";

const KitsPage = () => (
  <MainLayout>
    <KitsPanelContainer />
    <KitsContainer />
  </MainLayout>
);

export default KitsPage;