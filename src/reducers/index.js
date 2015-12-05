import { combineReducers } from "redux";
import fragment from "./fragment";
import route from "./route";

const rootReducer = combineReducers({
  fragment,
  route
});

export default rootReducer;
