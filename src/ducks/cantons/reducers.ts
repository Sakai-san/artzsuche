import { Reducer } from "redux";
import actions from "./actions";
import { ICantonsStore, isFetchAction } from "./types";

const reducer: Reducer<
  ICantonsStore,
  ReturnType<typeof actions.makeCantonsFetch>
> = (state = [], action) => {
  if (isFetchAction(action)) {
    return [...action.payload];
  } else {
    return state;
  }
};

export default reducer;
