import { ReactNode } from "react";

export interface IBaseCardProps {
  deleteCallback?: (id: string) => void;
  title?: ReactNode | null;
  subTitle?: ReactNode | null;
  description?: ReactNode | null;
  path?: string | null;
  id?: string | null;
}