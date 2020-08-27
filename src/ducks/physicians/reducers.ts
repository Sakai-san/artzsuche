import { Reducer } from "redux";
import actions from "./actions";
import { IPhysiciansStore, isFetchAction } from "./types";

const reducer: Reducer<
  IPhysiciansStore,
  ReturnType<typeof actions.makePhysiciansFetch>
> = (state = [], action) => {
  if (isFetchAction(action)) {
    return [...action.payload];
  } else {
    return state;
  }
};

export default reducer;
