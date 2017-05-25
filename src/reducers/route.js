import { handleActions } from 'redux-actions';

const reducer = handleActions(
  {
    UPDATE_ROUTE: (state, action) => {
      const { location, slideCount } = action.payload;
      const slideHash = location.pathname.replace(/\//g, '');
      let slide;

      if (isNaN(parseInt(slide))) {
        slide = slideHash;
      } else {
        const proposedSlideIndex = parseInt(
          location.pathname.replace(/\//g, '')
        );
        const isWithinBounds =
          proposedSlideIndex < slideCount && proposedSlideIndex >= 0;
        slide = isWithinBounds ? proposedSlideIndex : 0;
      }

      return Object.assign(
        {},
        {
          slide,
          params: location.search.replace('?', '').split('&'),
        }
      );
    },
  },
  { slide: null, params: [] }
);

export default reducer;
