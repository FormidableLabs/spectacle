import React from 'react';
/**
 * Performs logic operations for all of the deck domain level.
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */

export const DeckContext = React.createContext();

function useDeck(initialState, numSlides, looping, animationsWhenGoingBack) {
  function reducer(state, action) {
    switch (action.type) {
      case 'NEXT_SLIDE':
      case 'NEXT_SLIDE_IMMEDIATE':
        // If next slide is going to be greater than number
        // of slides, if it is looping then go to initial state
        // if not then stop
        if (state.currentSlide + 1 === numSlides) {
          if (looping) {
            return action.type === 'NEXT_SLIDE_IMMEDIATE'
              ? { ...initialState, immediate: true }
              : initialState;
          }
          return { ...state };
        }
        return action.type === 'NEXT_SLIDE_IMMEDIATE'
          ? { currentSlide: state.currentSlide + 1, immediate: true }
          : { currentSlide: state.currentSlide + 1 };
      case 'PREV_SLIDE':
        // If current slide is inital slide then if looping go
        // to last slide else stop
        if (state.currentSlide === initialState.currentSlide) {
          if (looping) {
            return {
              currentSlide: numSlides - 1,
              immediate: animationsWhenGoingBack ? true : false
            };
          }
          return { ...state };
        }
        return {
          currentSlide: state.currentSlide - 1,
          immediate: animationsWhenGoingBack ? true : false
        };
      default:
        return { ...state };
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return [state, dispatch, state.immediate];
}

export default useDeck;
