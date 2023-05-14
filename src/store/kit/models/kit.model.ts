import { IBaseError } from "../../../types/models/error.model";
import { IKit } from "../../models/kits.model";

export interface IKitError extends IBaseError {}

export interface IKitState {
  await: boolean;
  error: IKitError | null;
  defaultKitData: IKit | null;
  kitData: IKit | null;
  redirectId?: string | null;
}