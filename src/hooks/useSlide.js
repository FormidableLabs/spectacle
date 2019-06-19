import React from 'react';
import { DeckContext } from './useDeck';

/**
 * Performs logic operations for all of the slide domain level.
 * slideElements are dynamic elements within the slide that may
 * appear/ move around etc.
 * If remaining elements in slide, these are brought in one by one.
 * If not, we tell the deck to take us to the next slide.
 */

//  Keeps previous slide number for comparison later.
let prevSlideNum;

// Initialise SlideContext.
export const SlideContext = React.createContext();

function useSlide(initialState, isActiveSlide, slideElementsLength) {
  // Gets state, dispatch and number of slides off DeckContext.
  const [deckContextState, deckContextDispatch, slideLength] = React.useContext(
    DeckContext
  );

  function reducer(state, action) {
    // As we need to animate between slides, we need to check if
    // this is the active slide and only run the reducer if so

    if (isActiveSlide) {
      switch (action.type) {
        case 'NEXT_SLIDE_ELEMENT':
          // If there aren't any slideElements or this is the last
          // slideElement then go to next slide!
          if (
            slideElementsLength === 0 ||
            (state && state.currentSlideElement === slideElementsLength - 1)
          ) {
            deckContextDispatch({ type: 'NEXT_SLIDE' });
          }
          return {
            // Next slide element
            currentSlideElement: state ? state.currentSlideElement + 1 : 0
          };
        // If there aren't any slideElements or this is the first
        // slideElement then go to prev slide!
        case 'PREV_SLIDE_ELEMENT':
          if (state && state.currentSlideElement === 0) {
            deckContextDispatch({ type: 'PREV_SLIDE' });
          }
          return {
            // Prev slideElement
            currentSlideElement: state ? state.currentSlideElement - 1 : 0
          };
        // Resets our slideElements to initial (usually 0)
        case 'RESET_SLIDE_ELEMENT':
          return initialState;
        // Sets our slideElements to maximum useful when we want to
        // go back to a previous slide
        case 'SHOW_ALL_SLIDE_ELEMENTS':
          return { currentSlideElement: slideElementsLength };
        default:
          return { ...state };
      }
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') {
      dispatch({ type: 'PREV_SLIDE_ELEMENT' });
    }
    if (e.key === 'ArrowRight') {
      dispatch({ type: 'NEXT_SLIDE_ELEMENT' });
    }
  }

  // This useEffect adds a keyDown listener to the window.
  React.useEffect(
    function() {
      isActiveSlide ? window.addEventListener('keydown', handleKeyDown) : null;
      return function cleanup() {
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [isActiveSlide]
  );

  // If we're looping back through slides, then we need to reset it to the
  // highest slideElement state or it will look weird.
  React.useEffect(
    function() {
      // Need to check whether active slide
      if (isActiveSlide) {
        if (
          prevSlideNum === 0 &&
          deckContextState.currentSlide === slideLength - 1
        ) {
          dispatch({ type: 'SHOW_ALL_SLIDE_ELEMENTS' });
          prevSlideNum = deckContextState.currentSlide;
          return;
        }
        if (deckContextState.currentSlide < prevSlideNum) {
          dispatch({ type: 'SHOW_ALL_SLIDE_ELEMENTS' });
          prevSlideNum = deckContextState.currentSlide;
          return;
        }
      }
      prevSlideNum = deckContextState.currentSlide;
      dispatch({ type: 'RESET_SLIDE_ELEMENT' });
    },
    [deckContextState]
  );
  return [state, dispatch];
}

export default useSlide;
