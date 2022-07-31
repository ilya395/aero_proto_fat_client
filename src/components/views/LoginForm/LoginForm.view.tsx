import React, { memo } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { ELoginKeys, ELoginTitles } from "../../../pages/Login/enums/Login.enum";
import { ILoginFormProps } from "./models/LoginForm.model";

const LoginForm = (props: ILoginFormProps) => {
  const {
    login,
    password,
    handleSubmit,
    handleChange,
    validated,
  } = props;

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <Form.Group as={Col} controlId="login" className="mb-3">
        <Form.Label>Логин</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={ELoginTitles.Login}
          defaultValue={login}
          onChange={handleChange && handleChange(ELoginKeys.Login)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} controlId="password" className="mb-3">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          required
          type="password"
          placeholder={ELoginTitles.Password}
          defaultValue={password}
          onChange={handleChange && handleChange(ELoginKeys.Password)}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary" type="submit">
        Войти
      </Button>
    </Form>
  );
}

export default memo(LoginForm);