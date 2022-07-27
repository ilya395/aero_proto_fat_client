export interface IBaseModalProps {
  show?: boolean;
  closeWord?: string;
  handleClose?: () => void;
  actionWord?: string;
  handleAction?: () => void;
  children?: JSX.Element;
  title?: string;
}