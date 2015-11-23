import { combineReducers } from "redux";
import { routeReducer } from "redux-simple-router";
import fragment from "./fragment";

const rootReducer = combineReducers({
  fragment,
  routeReducer
});

export default rootReducer;
