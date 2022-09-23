import React from "react";
import ProductsContainer from "../../components/containers/Products/Products.container";
import ProductsPanelContainer from "../../components/containers/ProductsPanel/ProductsPanel.conatainer";
import MainLayout from "../../layouts/Main/Main.layout";

const ProductsPage = () => (
  <MainLayout>
    <ProductsPanelContainer />
    <ProductsContainer />
  </MainLayout>
);

export default ProductsPage;