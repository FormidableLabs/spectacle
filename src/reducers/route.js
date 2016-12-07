import { handleActions } from "redux-actions";
const updateRoute = (state, action) => {
  const { location, slideCount } = action.payload;
  const proposedSlideIndex = parseInt(location.pathname.replace(/\//g, ""));
  const isWithinBounds = proposedSlideIndex < slideCount && proposedSlideIndex >= 0;

  return Object.assign({}, {
    slide: isWithinBounds ? proposedSlideIndex : 0,
    params: location.search.replace("?", "").split("&")
  });
};

const initState = (state, action) => {
  const { route } = action.payload;

  return Object.assign({}, {
    slide: route.slide,
    params: route.params
  });
};

const reducer = handleActions({
  UPDATE_ROUTE: updateRoute,
  REMOTE_STATE: initState
}, { slide: 0, params: [] });

export default reducer;
