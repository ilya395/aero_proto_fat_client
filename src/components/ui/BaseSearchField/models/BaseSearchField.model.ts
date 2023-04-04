import { IDefaultPopoverProps } from "../components/DefaultPopover/models/DefaultPopover.model";

export interface IBaseSearchFieldProps<T> extends IDefaultPopoverProps<T> {
  id: string;
  label: string;
  placeholder?: string;
  onSearch?: (arg: string) => void;
  value?: T | null;
  computedValueHandle?: (arg?: T | null) => string | undefined | null;
  delay?: number;
  reset?: () => void;
}