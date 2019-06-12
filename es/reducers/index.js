import { combineReducers } from 'redux';
import fragment from './fragment';
import route from './route';
import style from './style';
var rootReducer = combineReducers({
  fragment: fragment,
  route: route,
  style: style
});
export default rootReducer;