import { IPhysiciansStore } from "./physicians/types";
import { ICantonsStore } from "./cantons/types";

export interface IReduxStore {
  physicians: IPhysiciansStore;
  cantons: ICantonsStore;
}
