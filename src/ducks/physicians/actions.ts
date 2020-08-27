import { actionTypes, IPhysician } from "./types";

const makePhysiciansFetch = (result: IPhysician[]) => ({
  type: actionTypes.PHYSICIANS_FETCH,
  payload: result,
});

export default {
  makePhysiciansFetch,
};
