import { handleActions } from "redux-actions";

const reducer = handleActions({
  ADD_FRAGMENT: (state, action) => {
    const {
      id,
      slide,
      visible
    } = action.payload;
    const s = Object.assign({}, state);
    s.fragments[slide] = s.fragments[slide] || {};
    s.fragments[slide][id] = action.payload;
    return s;
  },
  UPDATE_FRAGMENT: (state, action) => {
    const {
      fragment,
      visible
    } = action.payload;
    const s = Object.assign({}, state);
    s.fragments[fragment.slide][fragment.id].visible = action.payload.visible;
    return s;
  }
}, { fragments: {} });

export default reducer;
