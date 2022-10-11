export interface IFormPanel {
  clearFormHandle?: () => void;
  saveFormHandle?: () => void;
  cancelFormHandle?: () => void;
  children?: JSX.Element;
}