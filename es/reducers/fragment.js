import { handleActions } from 'redux-actions';
var reducer = handleActions({
  ADD_FRAGMENT: function ADD_FRAGMENT(state, action) {
    var _action$payload = action.payload,
        id = _action$payload.id,
        slide = _action$payload.slide;
    var s = Object.assign({}, state);
    s.fragments[slide] = s.fragments[slide] || {};
    s.fragments[slide][id] = action.payload;
    return s;
  },
  UPDATE_FRAGMENT: function UPDATE_FRAGMENT(state, action) {
    var fragment = action.payload.fragment;
    var s = Object.assign({}, state);
    s.fragments[fragment.slide][fragment.id].animations = action.payload.animations;
    return s;
  }
}, {
  fragments: {}
});
export default reducer;