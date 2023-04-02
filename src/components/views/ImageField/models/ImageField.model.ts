import { IBaseFileInputProps } from "../../../ui/BaseFileInput/models/BaseFileInput.model";

export interface IImageFieldProps extends IBaseFileInputProps {
  resetHandle?: () => void;
  width?: number | "auto";
  height?: number | "auto";
}