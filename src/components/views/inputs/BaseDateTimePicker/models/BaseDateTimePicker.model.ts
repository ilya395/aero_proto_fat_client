import { IDefaultTextInputProps } from "../../BaseTextInput/models/BaseTextInput.model";

export interface IBaseDateTimePickerProps extends IDefaultTextInputProps {
  value?: Date;
  callback?: (arg: {[x: string]: Date}) => void;
}