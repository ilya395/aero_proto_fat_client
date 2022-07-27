export interface IBaseCardProps {
  deleteCallback?: (id: string) => void;
  title?: string;
  subTitle?: string;
  description?: string;
  path?: string;
  id?: string;
}