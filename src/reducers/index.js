import { combineReducers } from 'redux';
import fragment from './fragment';
import route from './route';
import style from './style';

const rootReducer = combineReducers({
  fragment,
  route,
  style
});

export default rootReducer;
