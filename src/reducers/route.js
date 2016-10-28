import { handleActions } from "redux-actions";

const reducer = handleActions({
  UPDATE_ROUTE: (state, action) => {
    const { location, slideCount } = action.payload;
    const proposedSlideIndex = parseInt(location.pathname.replace(/\//g, ""));
    const isWithinBounds = proposedSlideIndex < slideCount && proposedSlideIndex >= 0;

    return Object.assign({}, {
      slide:  isWithinBounds ? proposedSlideIndex : 0,
      params: location.search.replace("?", "").split("&")
    });
  }
}, { slide: 0, params: [] });

export default reducer;
