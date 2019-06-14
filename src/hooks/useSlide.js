import React from 'react';

/**
 *
 */

export const SlideContext = React.createContext();

function useSlide(initialState) {
  function reducer(state, action) {
    switch (action.type) {
      case 'next slide element':
        return { currentSlideElement: state.currentSlideElement + 1 };
      case 'prev slide element':
        return { currentSlideElement: state.currentSlideElement - 1 };
      default:
        return { ...state };
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return [state, dispatch];
}

export default useSlide;
