import { actionTypes, ICanton } from "./types";

const makeCantonsFetch = (cantons: ICanton[]) => ({
  type: actionTypes.CANTONS_FETCH,
  payload: cantons,
});

export default {
  makeCantonsFetch,
};
