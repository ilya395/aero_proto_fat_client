import React, { memo, useCallback } from "react";
import BaseTextInput from "../BaseTextInput/BaseTextInput.component";
import { IBaseNumberInputProps } from "./models/BaseNumberInput.model";

const BaseNumberInput = memo((props: IBaseNumberInputProps) => {
  const {
    value = undefined,
    objectKey = "number",
    callback,
    ...rest
  } = props;
  const validValue = useCallback((arg: typeof value) => (arg) && isNaN(arg) ? String(arg) : undefined, []);
  const updateValue = (arg: {[x: typeof objectKey]: string}) => (arg) && isNaN(Number(arg[objectKey])) && callback && objectKey ? callback({[objectKey]: Number(arg[objectKey])}) : undefined;
  return (
    <BaseTextInput
      value={validValue(value)}
      callback={updateValue}
      objectKey={objectKey}
      {...rest}
    />
  );
});

export default BaseNumberInput;