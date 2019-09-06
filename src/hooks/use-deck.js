import React from 'react';
/**
 * Performs logic operations for all of the deck domain level.
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */

export const DeckContext = React.createContext();

function useDeck(initialState) {
  function reducer(state, action) {
    switch (action.type) {
      case 'GO_TO_SLIDE': {
        const newState = {
          ...state,
          currentSlideElement: action.payload.slideElementNumber,
          currentSlide: action.payload.slideNumber,
          immediate: action.payload.immediate,
          immediateElement: false,
          reverseDirection: action.payload.reverseDirection,
          presenterMode: action.payload.presenterMode,
          resolvedInitialUrl: true
        };
        return newState;
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
