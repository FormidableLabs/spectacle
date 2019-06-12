import { handleActions } from 'redux-actions';
var reducer = handleActions({
  SET_GLOBAL_STYLE: function SET_GLOBAL_STYLE() {
    return Object.assign({}, {
      globalStyleSet: true
    });
  }
}, {
  globalStyleSet: false
});
export default reducer;