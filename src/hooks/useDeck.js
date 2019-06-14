import React from 'react';

/**
 * Exposes DeckContext for use in Deck component and its children
 */

export const DeckContext = React.createContext();

function useDeck(initialState) {
  function reducer(state, action) {
    switch (action.type) {
      case 'next slide':
        return { currentSlide: state.currentSlide + 1 };
      case 'prev slide':
        return { currentSlide: state.currentSlide - 1 };
      default:
        return { ...state };
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return [state, dispatch];
}

export default useDeck;
