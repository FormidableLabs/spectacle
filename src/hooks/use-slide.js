import React from 'react';
import { DeckContext } from './use-deck';
import { DEFAULT_SLIDE_ELEMENT_INDEX } from '../utils/constants';

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

function useSlide(slideNum) {
  // Gets state, dispatch and number of slides off DeckContext.
  const {
    state: deckContextState,
    dispatch: deckContextDispatch,
    slideElementMap
  } = React.useContext(DeckContext);

  const { reverseDirection, immediate } = deckContextState;
  const slideElementsLength = slideElementMap[slideNum];

  const isActiveSlide = deckContextState.currentSlide === slideNum;

  const setNotes = React.useCallback(
    notes => {
      deckContextDispatch({
        type: 'SET_NOTES',
        payload: { notes, slideNumber: slideNum }
      });
    },
    [deckContextDispatch, slideNum]
  );

  const currentSlideElement = isActiveSlide
    ? deckContextState.currentSlideElement
    : DEFAULT_SLIDE_ELEMENT_INDEX;

  return {
    state: {
      reverseDirection,
      slideElementsLength,
      currentSlideElement,
      immediate,
      isActiveSlide
    },
    actions: {
      setNotes
    }
  };
}

export default useSlide;
