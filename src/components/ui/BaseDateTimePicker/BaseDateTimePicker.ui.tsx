import React, { memo, useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { IBaseDateTimePickerProps } from "./models/BaseDateTimePicker.model";

const BaseDateTimePicker = memo((props: IBaseDateTimePickerProps) => {
  const {
    id,
    label,
    value,
    objectKey,
    callback,
  } = props;
  const [date, setDate] = useState(value);
  useEffect(() => setDate(value), [value]);
  const handleChange = useCallback((arg: Date) => {
    setDate(arg);
    callback && callback({
      [objectKey]: arg,
    });
  }, [callback, objectKey]);
  return (
    <Form.Group className="mb-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <DateTimePicker onChange={handleChange} value={date} className="form-control" />
    </Form.Group>
  );
});

export default BaseDateTimePicker;