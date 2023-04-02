import React from "react";
import { Button, Figure } from "react-bootstrap";
import { IImageFieldProps } from "./models/ImageField.model";
import BaseFileInput from "../../ui/BaseFileInput/BaseFileInput.ui";

const ImageField = (props: IImageFieldProps) => {
  const { value, resetHandle, width = 150, height = 150, placeholder, ...rest } = props;

  return value ? (
    <Figure>
      <div className="form-label">{placeholder}</div>
      <Figure.Image
        width={width}
        height={height}
        alt="pictiure"
        src={value}
      />
      <Figure.Caption>
        <Button variant="outline-danger" size="sm" onClick={resetHandle}>Удалить</Button>
      </Figure.Caption>
    </Figure>
  ) : (<BaseFileInput {...rest} value={value} placeholder={placeholder} />);
}

export default ImageField;