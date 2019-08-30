import React from 'react';
import { DeckContext } from './use-deck';

/**
 * Performs logic operations for all of the slide domain level.
 * slideElements are dynamic elements within the slide that may
 * appear/ move around etc.
 * If remaining elements in slide, these are brought in one by one.
 * If not, we tell the deck to take us to the next slide.
 *
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */

// Initialise SlideContext.
export const SlideContext = React.createContext();

function useSlide(initialState, slideNum, slideElementsLength) {
  // Gets state, dispatch and number of slides off DeckContext.
  const {
    state: deckContextState,
    dispatch: deckContextDispatch
  } = React.useContext(DeckContext);

  const isActiveSlide = deckContextState.currentSlide === slideNum;

  const setNotes = React.useCallback(
    notes => {
      deckContextDispatch({ type: 'SET_CURRENT_NOTES', payload: notes });
    },
    [deckContextDispatch]
  );

  return {
    state: {
      ...initialState,
      slideElementsLength,
      currentSlideElement: deckContextState.currentSlideElement,
      immediate: false,
      isActiveSlide
    },
    actions: {
      setNotes
    }
  };
}

export default useSlide;
