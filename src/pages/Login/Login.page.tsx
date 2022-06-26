import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { ELoginKeys, ELoginTitles } from "./enums/Login.enum";

const LoginPage = () => {
  const [authData, setAuthData] = useState({
    login: "",
    password: "",
  });
  const handleChange = (arg: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData(state => ({
      ...state,
      [arg]: event.target.value,
    }))
  }
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => { // ?
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} controlId="login" className="mb-3">
        <Form.Label>Логин</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={ELoginTitles.Login}
          defaultValue={authData.login}
          onChange={handleChange(ELoginKeys.Login)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} controlId="password" className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder={ELoginTitles.Password}
          defaultValue={authData.password}
          onChange={handleChange(ELoginKeys.Password)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  )
};

export default LoginPage;