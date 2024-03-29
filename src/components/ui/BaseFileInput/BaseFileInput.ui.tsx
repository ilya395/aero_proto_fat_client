import React, { ChangeEvent, useCallback } from "react";
import { Form } from "react-bootstrap";
import { IBaseFileInputProps } from "./models/BaseFileInput.model";

const BaseFileInput = (props: IBaseFileInputProps) => {
  const {
    id = "file-input",
    label = "Поле ввода",
    placeholder  = "",
    type = "file",
    value = "",
    objectKey = "url",
    callback,
  } = props;
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target.files?.[0];
    if (objectKey && callback && target) {
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
}

export default BaseFileInput;
