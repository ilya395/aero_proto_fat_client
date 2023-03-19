import React from "react";
import { ILoginLayoutProps } from "./models/Login.model";

const LoginLayout = (props: ILoginLayoutProps) => {
  const { children } = props;
  return (
    <div className="layout">
      <main className="main bg-light">
        <div className="login-form">
          {children}
        </div>
      </main>
    </div>
  );
}

export default LoginLayout;