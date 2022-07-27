import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../layouts/Main/Main.layout";

const CustomerPage = () => {
  const params = useParams();
  const { id, } = params;
  const isNew = useMemo(() => !id, [id])
  console.log(isNew)
  return (
    <MainLayout>
      {id}
    </MainLayout>
  );
};

export default CustomerPage;