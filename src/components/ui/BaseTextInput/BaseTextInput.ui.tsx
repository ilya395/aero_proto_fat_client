import React, { ChangeEvent, memo, useCallback } from "react";
import { Form } from "react-bootstrap";
import { IBaseTextInputProps } from "./models/BaseTextInput.model";

const BaseTextInput = memo((props: IBaseTextInputProps) => {
  const {
    id = "text-input",
    label = "Поле ввода",
    placeholder  = "",
    type = "text",
    value = "",
    objectKey = "text",
    callback,
  } = props;
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.value;
    if (objectKey && callback) {
      callback({
        [objectKey]: target,
      });
    }
  }, [callback, objectKey]);
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value ?? undefined}
        onChange={handleChange}
      />
    </Form.Group>
  );
});

export default BaseTextInput;