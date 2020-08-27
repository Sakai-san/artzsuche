export enum actionTypes {
  PHYSICIANS_FETCH = "@PHYSICIANS/fetch",
}

export interface IPhysician {
  ProductDoctorname?: string;
  ProductDoctorId?: number;
  ProductDoctorAddress?: string;
  ProductDoctorZip?: string;
  ProductDoctorCom?: string;
  Phone?: string;
  TariffName?: string;
}

export type IPhysicianStore = IPhysician[];

interface IAction {
  type: actionTypes;
}

interface IActionFetch extends IAction {
  payload: IPhysician[];
}

// TYPE GUARDS
export const isFetchAction = (action: IAction): action is IActionFetch =>
  action.type === actionTypes.PHYSICIANS_FETCH;
