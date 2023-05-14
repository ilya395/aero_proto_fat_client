import BaseTextInput from "../../BaseTextInput/BaseTextInput.ui";

export interface IBaseFormProps {
  config?: IBaseFormConfig;
  col?: {
    xs: number;
    sm: number;
    xl: number;
  } | false;
}

export interface IBaseFormConfig {
  title?: string;
  column?: number;
  list?: Array<{
    component: JSX.Element;
    id: string;
    cell?: number;
  }>;
}

export interface IBaseFormConfigItem {
  component: null | typeof BaseTextInput;
}