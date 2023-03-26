export interface IDefaultTextInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  objectKey: string;
}

export interface IBaseTextInputProps extends IDefaultTextInputProps {
  value?: string | null;
  callback?: (arg: {[x: string]: string}) => void;
}