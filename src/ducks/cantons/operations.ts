import { Dispatch } from "redux";
import actions from "./actions";

const fetchCantons = (dispatch: Dispatch) => {
  fetch("https://sakai-san.github.io/artzsuche/cantons.json")
    .then((r) => r.json())
    .then((r) => dispatch(actions.makeCantonsFetch(r || [])));
};

export default { fetchCantons };
