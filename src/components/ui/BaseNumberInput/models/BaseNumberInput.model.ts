import { IDefaultTextInputProps } from "../../BaseTextInput/models/BaseTextInput.model";

export interface IBaseNumberInputProps extends IDefaultTextInputProps {
  value?: number;
  callback?: (arg: {[x: string]: number}) => void;
}