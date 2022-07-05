import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IMainLayoutProps } from "./models/Main.model";

const MainLayout = (props: IMainLayoutProps) => {
  const {
    children,
  } = props;
  return (
    <main className="layout">
      <Container>
        <Row>
          <Col>
            menu
          </Col>
          <Col>
            sign out
          </Col>
        </Row>
      </Container>
      {children}
    </main>
  );
}

export default MainLayout;