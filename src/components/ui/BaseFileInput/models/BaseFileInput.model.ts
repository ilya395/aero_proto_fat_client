import { IDefaultTextInputProps } from "../../BaseTextInput/models/BaseTextInput.model";

export interface IBaseFileInputProps extends IDefaultTextInputProps {
  value?: string | null;
  callback?: (arg: {[x: string]: File}) => void;
}