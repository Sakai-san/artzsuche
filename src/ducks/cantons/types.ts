export enum actionTypes {
  CANTONS_FETCH = "@CANTONS/fetch",
}

export type ICanton = string;

export type ICantonsStore = ICanton[];

interface IAction {
  type: actionTypes;
}

interface IActionFetch extends IAction {
  payload: ICanton[];
}

// TYPE GUARDS
export const isFetchAction = (action: IAction): action is IActionFetch =>
  action.type === actionTypes.CANTONS_FETCH;
