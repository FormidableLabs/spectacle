import React from 'react';
/**
 * Performs logic operations for all of the deck domain level.
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */

export const DeckContext = React.createContext();

function useDeck(
  initialState,
  numSlides,
  looping,
  animationsWhenGoingBack,
  slideElementMap
) {
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
              ? {
                  ...initialState,
                  immediate: true,
                  reverseDirection: false,
                  immediateElement: false
                }
              : initialState;
          }
          return { ...state };
        }
        return action.type === 'NEXT_SLIDE_IMMEDIATE'
          ? {
              currentSlide: state.currentSlide + 1,
              immediate: true,
              currentSlideElement: 0,
              immediateElement: false,
              reverseDirection: false
            }
          : {
              currentSlide: state.currentSlide + 1,
              currentSlideElement: 0,
              immediate: false,
              immediateElement: false,
              reverseDirection: false
            };
      case 'PREV_SLIDE':
        // If current slide is initial slide then if looping go
        // to last slide else stop
        if (state.currentSlide === initialState.currentSlide) {
          if (looping) {
            return {
              currentSlide: numSlides - 1,
              currentSlideElement: Math.max(slideElementMap[numSlides - 1], 0),
              immediate: !!animationsWhenGoingBack,
              reverseDirection: true
            };
          }
          return { ...state };
        }
        return {
          currentSlide: state.currentSlide - 1,
          currentSlideElement: Math.max(
            slideElementMap[state.currentSlide - 1],
            0
          ),
          immediate: !!animationsWhenGoingBack,
          immediateElement: true,
          reverseDirection: true
        };
      case 'NEXT_SLIDE_ELEMENT': {
        return {
          ...state,
          currentSlideElement: state.currentSlideElement + 1,
          immediateElement: false,
          reverseDirection: false
        };
      }
      case 'NEXT_SLIDE_ELEMENT_IMMEDIATE': {
        return {
          ...state,
          currentSlideElement: state.currentSlideElement + 1,
          immediateElement: true,
          reverseDirection: false
        };
      }
      case 'PREV_SLIDE_ELEMENT': {
        return {
          ...state,
          currentSlideElement: Math.max(state.currentSlideElement - 1, 0),
          immediateElement: false,
          reverseDirection: true
        };
      }
      case 'PREV_SLIDE_ELEMENT_IMMEDIATE': {
        return {
          ...state,
          currentSlideElement: Math.max(state.currentSlideElement - 1, 0),
          immediateElement: true,
          reverseDirection: true
        };
      }
      default:
        return { ...state };
    }
  }
  const [state, dispatch] = React.useReducer((state, action) => {
    const _reducer = reducer(state, action);
    // console.log(_reducer);
    return _reducer;
  }, initialState);

  return [state, dispatch, state.immediate];
}

export default useDeck;
