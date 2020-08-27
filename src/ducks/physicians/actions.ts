import { actionTypes, IPhysician } from "./types";

const makePhysiciansFetch = (physicians: IPhysician[]) => ({
  type: actionTypes.PHYSICIANS_FETCH,
  payload: physicians,
});

export default {
  makePhysiciansFetch,
};
