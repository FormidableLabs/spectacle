import { combineReducers } from "redux";
import fragment from "./fragment";
import route from "./route";
import style from "./style";
const lastAction = (state = null, action) => {
  return action;
};
const rootReducer = combineReducers({
  fragment,
  route,
  style,
  lastAction
});

export default rootReducer;
