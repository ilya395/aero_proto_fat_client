import BaseTextInput from "../../inputs/BaseTextInput/BaseTextInput.component";

export interface IBaseFormProps {
  config?: IBaseFormConfig;
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
  component: null | typeof BaseTextInput

}