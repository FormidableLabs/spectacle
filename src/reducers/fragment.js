import { handleActions } from "redux-actions";

const reducer = handleActions({
  ADD_FRAGMENT: (state, action) => {
    const {
      id,
      slide
    } = action.payload;
    const s = Object.assign({}, state);
    s.fragments[slide] = s.fragments[slide] || {};
    s.fragments[slide][id] = action.payload;
    return s;
  },
  UPDATE_FRAGMENT: (state, action) => {
    const {
      fragment
    } = action.payload;
    const s = Object.assign({}, state);
    s.fragments[fragment.slide][fragment.id].visible = action.payload.visible;
    return s;
  }
}, { fragments: {} });

export default reducer;
