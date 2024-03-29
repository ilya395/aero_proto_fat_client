import React, { memo, useCallback } from "react";
import BaseTextInput from "../BaseTextInput/BaseTextInput.ui";
import { IBaseNumberInputProps } from "./models/BaseNumberInput.model";

const BaseNumberInput = memo((props: IBaseNumberInputProps) => {
  const {
    value = undefined,
    objectKey = "number",
    callback,
    ...rest
  } = props;
  const validValue = useCallback((arg: typeof value) => (arg) && isNaN(arg) ? String(arg) : undefined, []);
  const updateValue = useCallback((arg: {[x: typeof objectKey]: string}) => (arg) && isNaN(Number(arg[objectKey])) && callback && objectKey ? callback({[objectKey]: Number(arg[objectKey])}) : undefined, [callback, objectKey]);
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