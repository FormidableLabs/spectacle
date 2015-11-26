import { handleActions } from "redux-actions";

const reducer = handleActions({
  UPDATE_ROUTE: (state, action) => {
    return Object.assign({}, {
      slide: action.payload.pathname.replace(/\//g, ""),
      params: action.payload.search
    });
  }
}, { slide: 0, params: ""});

export default reducer;
