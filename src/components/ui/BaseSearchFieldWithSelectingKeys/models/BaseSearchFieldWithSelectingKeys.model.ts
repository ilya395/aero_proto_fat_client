import { IBaseSearchFieldProps } from "../../BaseSearchField/models/BaseSearchField.model";

export interface IBaseSearchFieldWithSelectingKeysProps<T> extends IBaseSearchFieldProps<T> {
  keys: Array<{
    value: string;
    label: string;
  }>;
  currentKey: string;
  onChooseKey: React.ChangeEventHandler<HTMLSelectElement>;
}