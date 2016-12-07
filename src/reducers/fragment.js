import { handleActions } from "redux-actions";
const addFragment = (state, action) => {
  const {
    id,
    slide
  } = action.payload;
  const s = Object.assign({}, state);
  s.fragments[slide] = s.fragments[slide] || {};
  s.fragments[slide][id] = action.payload;
  return s;
};

const updateFragment = (state, action) => {
  const {
    fragment
  } = action.payload;
  const s = Object.assign({}, state);
  s.fragments[fragment.slide][fragment.id].visible = action.payload.visible;
  return s;
};

const initState = (state, action) => {
  const { fragment } = action.payload;
  const s = Object.assign({}, state);
  s.fragments = fragment.fragments;
  return s;
};

const reducer = handleActions({
  ADD_FRAGMENT: addFragment,
  UPDATE_FRAGMENT: updateFragment,
  REMOTE_STATE: initState
}, { fragments: {} });

export default reducer;
