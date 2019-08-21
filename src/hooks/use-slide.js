import React from 'react';

import { DeckContext } from './use-deck';
import debounce from '../utils/debounce';

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

function useSlide(
  initialState,
  slideNum,
  slideElementsLength,
  keyboardControls
) {
  // Gets state, dispatch and number of slides off DeckContext.
  const [
    deckContextState,
    deckContextDispatch,
    ,
    ,
    animationsWhenGoingBack
  ] = React.useContext(DeckContext);

  const isActiveSlide = deckContextState.currentSlide === slideNum;

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
            (state && state.currentSlideElement === slideElementsLength)
          ) {
            deckContextDispatch({ type: 'NEXT_SLIDE' });
          }
          return {
            // Next slide element
            currentSlideElement: state ? state.currentSlideElement + 1 : 0
          };
        case 'IMMEDIATE_NEXT_SLIDE_ELEMENT':
          if (
            slideElementsLength === 0 ||
            (state && state.currentSlideElement === slideElementsLength)
          ) {
            deckContextDispatch({ type: 'NEXT_SLIDE_IMMEDIATE' });
          }
          return {
            // Next slide element
            currentSlideElement: state ? state.currentSlideElement + 1 : 0,
            immediate: true
          };
        // If there aren't any slideElements or this is the first
        // slideElement then go to prev slide!
        case 'PREV_SLIDE_ELEMENT':
          if (state && state.currentSlideElement === 0) {
            deckContextDispatch({ type: 'PREV_SLIDE' });
          }
          if (!animationsWhenGoingBack) {
            return {
              currentSlideElement: state ? state.currentSlideElement - 1 : 0,
              immediate: true
            };
          }
          return {
            // Prev slideElement
            currentSlideElement: state ? state.currentSlideElement - 1 : 0
          };
        default:
          return { ...state };
      }
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // This useEffect adds a keyDown listener to the window.
  React.useEffect(
    function() {
      // Keep track of the number of next slide presses for debounce
      let nextSlidePress = 0;
      // Create ref for debounceing function
      const debouncedDispatch = debounce(() => {
        if (nextSlidePress === 1) {
          dispatch({ type: 'NEXT_SLIDE_ELEMENT' });
        } else {
          dispatch({ type: 'IMMEDIATE_NEXT_SLIDE_ELEMENT' });
        }
        nextSlidePress = 0;
      }, 200);
      function handleKeyDown(e) {
        if (keyboardControls === 'arrows') {
          if (e.key === 'ArrowLeft') {
            dispatch({ type: 'PREV_SLIDE_ELEMENT' });
          }
          if (e.key === 'ArrowRight') {
            nextSlidePress++;
            debouncedDispatch();
          }
        }
        if (keyboardControls === 'space') {
          if (e.code === 'Space') {
            nextSlidePress++;
            debouncedDispatch();
            e.preventDefault();
          }
        }
      }
      isActiveSlide ? window.addEventListener('keydown', handleKeyDown) : null;
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [isActiveSlide, keyboardControls]
  );
  return [state, dispatch];
}

export default useSlide;
