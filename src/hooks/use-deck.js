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
        return {
          ...state,
          currentSlide: state.currentSlide + 1,
          currentSlideElement: 0,
          immediate: false,
          immediateElement: false,
          reverseDirection: false
        };
      case 'NEXT_SLIDE_IMMEDIATE':
        return {
          ...state,
          currentSlide: state.currentSlide + 1,
          immediate: true,
          currentSlideElement: 0,
          immediateElement: false,
          reverseDirection: false
        };
      case 'GO_TO_SLIDE': {
        return {
          ...state,
          currentSlideElement: 0,
          currentSlide: action.payload.slideNumber,
          immediate: action.payload.immediate,
          immediateElement: false,
          reverseDirection: action.payload.reverseDirection,
          presenterMode: action.payload.presenterMode
        };
      }
      case 'PREV_SLIDE':
        return {
          ...state,
          currentSlide: state.currentSlide - 1,
          currentSlideElement: Math.max(
            slideElementMap[state.currentSlide - 1],
            0
          ),
          immediate: !!animationsWhenGoingBack,
          immediateElement: true,
          reverseDirection: true
        };
      case 'NEXT_SLIDE_ELEMENT':
        return {
          ...state,
          currentSlideElement: state.currentSlideElement + 1,
          immediateElement: false,
          reverseDirection: false
        };
      case 'NEXT_SLIDE_ELEMENT_IMMEDIATE':
        return {
          ...state,
          currentSlideElement: state.currentSlideElement + 1,
          immediateElement: true,
          reverseDirection: false
        };
      case 'PREV_SLIDE_ELEMENT':
        return {
          ...state,
          currentSlideElement: Math.max(state.currentSlideElement - 1, 0),
          immediateElement: false,
          reverseDirection: true
        };
      case 'PREV_SLIDE_ELEMENT_IMMEDIATE':
        return {
          ...state,
          currentSlideElement: Math.max(state.currentSlideElement - 1, 0),
          immediateElement: true,
          reverseDirection: true
        };
      case 'SET_PRESENTER_MODE': {
        return {
          ...state,
          presenterMode: action.payload.presenterMode
        };
      }
      case 'SET_CURRENT_NOTES': {
        return {
          ...state,
          currentNotes: action.payload
        };
      }
      default:
        return { ...state };
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return { state, dispatch };
}

export default useDeck;
