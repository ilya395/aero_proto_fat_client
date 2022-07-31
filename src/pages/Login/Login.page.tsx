import React, { useCallback, useState } from "react";
import LoginForm from "../../components/views/LoginForm/LoginForm.view";
import LoginLayout from "../../layouts/Login/Login.layout";
import { authActionCreator } from "../../store/auth/action-creators/auth.action-creator";
import { useAppDispatch } from "../../store/hooks/store.hook";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [authData, setAuthData] = useState({
    login: "",
    password: "",
  });

  const handleChange = useCallback((arg: string) => (event: React.ChangeEvent<HTMLInputElement>) => setAuthData(state => ({
    ...state,
    [arg]: event.target.value,
  })), [setAuthData]);

  const [validated, setValidated] = useState(false);

  const handleSubmit = useCallback((event: React.SyntheticEvent) => { // ?
    event.preventDefault();
    // event.stopPropagation();
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {

    // }

    setValidated(true);

    dispatch(authActionCreator({
      email: authData.login,
      password: authData.password,
    }));
  }, [authData.login, authData.password, dispatch]);

  return (
    <LoginLayout>
      <LoginForm
        login={authData.login}
        password={authData.password}
        validated={validated}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </LoginLayout>
  )
};

export default LoginPage;