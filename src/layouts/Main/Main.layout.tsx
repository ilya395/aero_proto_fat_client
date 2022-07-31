import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Col, Container, Dropdown, Row } from "react-bootstrap";
import { IMainLayoutProps } from "./models/Main.model";
import "./Main.style.scss";
import { ENavigationKeys, ENavigationTitles } from "../../enums/navigation.enum";
import BreadcrumbsContainer from "../../components/containers/Breadcrumbs/Breadcrumbs.container";

const MainLayout = (props: IMainLayoutProps) => {
  const {
    children,
  } = props;

  const navigate = useNavigate();

  const handleSingOut = () => {
    signOut(getAuth());
  }

  return (
    <div className="layout">
      <header className="header">
        <Container>
          <Row>
            <Col>
              <div className="burger-menu">
                <Dropdown className="d-block" autoClose="outside">
                  <Dropdown.Toggle id="dropdown-basic-menu" className="without-arrow">
                    <div className="icon-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                      </svg>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate(ENavigationKeys.Orders)}>{ENavigationTitles.Orders}</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate(ENavigationKeys.Products)}>{ENavigationTitles.Products}</Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate(ENavigationKeys.Customers)}>{ENavigationTitles.Customers}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
            <Col>
              <div className="logout-menu">
                <Dropdown className="d-block" autoClose="outside">
                  <Dropdown.Toggle id="dropdown-basic-menu" className="without-arrow">
                    <div className="icon-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
                      </svg>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleSingOut}>Выход</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <main className="main">
        <Container>
          <Row>
            <BreadcrumbsContainer />
          </Row>
          {children}
        </Container>
      </main>
    </div>
  );
}

export default MainLayout;