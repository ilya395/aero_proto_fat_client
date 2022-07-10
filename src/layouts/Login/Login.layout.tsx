import React from "react";
import MainLayout from "../Main/Main.layout";
import { ILoginLayoutProps } from "./models/Login.model";

const LoginLayout = (props: ILoginLayoutProps) => {
  const { children } = props;
  return (
    <MainLayout>
      <div className="login-form">
        {children}
      </div>
    </MainLayout>
  );
}

export default LoginLayout;