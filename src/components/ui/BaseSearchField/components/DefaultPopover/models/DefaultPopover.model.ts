import { ReactNode } from "react";

export interface IDefaultPopoverProps<T> {
  items?: Array<T> | null;
  callback?: (arg: T) => void;
  renderProps?: (arg: T) => ReactNode;
  await?: boolean | null;
}