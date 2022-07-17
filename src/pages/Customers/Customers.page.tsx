import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import MainLayout from "../../layouts/Main/Main.layout";
import { useAppDispatch } from "../../store/hooks/store.hook";
import { fetchUsersList } from "../../store/users/action-creators/users.action-creator";

const CustomersPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);
  return (
    <MainLayout>
      <Row>
        <div>panel</div>
      </Row>
      <Row>
        <div>Customers</div>
      </Row>
    </MainLayout>
  );
}

export default CustomersPage;