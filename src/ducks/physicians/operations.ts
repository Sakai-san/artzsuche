import { Dispatch } from "redux";
import actions from "./actions";

const fetchPhysicians = (dispatch: Dispatch) => {
  fetch("https://sakai-san.github.io/artzsuche/physicians.json")
    .then((r) => r.json())
    .then((r) => dispatch(actions.makePhysiciansFetch(r || [])));
};

export default { fetchPhysicians };
