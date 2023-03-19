import React from "react";
import CustomerPanel from "../../components/containers/CustomersPanel/CustomersPanel.container";
import CustomersContainer from "../../components/containers/Customers/Customers.container";
import MainLayout from "../../layouts/Main/Main.layout";

const CustomersPage = () => (
  <MainLayout>
    <CustomerPanel />
    <CustomersContainer />
  </MainLayout>
);

export default CustomersPage;