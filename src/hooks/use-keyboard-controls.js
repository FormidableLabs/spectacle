import React from 'react';
import debounce from '../utils/debounce';
import { DeckContext } from './use-deck';

const useKeyboardControls = ({
  keyboardControls = 'arrows',
  sendMessageForSlideIndex
}) => {
  const {
    state: deckContextState,
    dispatch: deckContextDispatch,
    slideElementMap,
    navigateToNextSlide,
    navigateToPreviousSlide,
    animationsWhenGoingBack
  } = React.useContext(DeckContext);

  const slideElementsLength = slideElementMap[deckContextState.currentSlide];

  const goToNextSlideElement = React.useCallback(() => {
    if (
      slideElementsLength === 0 ||
      deckContextState.currentSlideElement === slideElementsLength
    ) {
      navigateToNextSlide({ onNavigate: sendMessageForSlideIndex });
    } else {
      deckContextDispatch({ type: 'NEXT_SLIDE_ELEMENT' });
    }
  }, [
    deckContextDispatch,
    deckContextState.currentSlideElement,
    navigateToNextSlide,
    sendMessageForSlideIndex,
    slideElementsLength
  ]);

  const goToImmediateNextSlideElement = React.useCallback(() => {
    if (
      slideElementsLength === 0 ||
      deckContextState.currentSlideElement === slideElementsLength
    ) {
      navigateToNextSlide({
        immediate: true,
        onNavigate: sendMessageForSlideIndex
      });
    } else {
      deckContextDispatch({ type: 'NEXT_SLIDE_ELEMENT_IMMEDIATE' });
    }
  }, [
    deckContextDispatch,
    deckContextState.currentSlideElement,
    navigateToNextSlide,
    sendMessageForSlideIndex,
    slideElementsLength
  ]);

  const goToPreviousSlideElement = React.useCallback(() => {
    if (deckContextState.currentSlideElement === 0) {
      navigateToPreviousSlide({ onNavigate: sendMessageForSlideIndex });
    } else {
      if (!animationsWhenGoingBack) {
        deckContextDispatch({ type: 'PREV_SLIDE_ELEMENT_IMMEDIATE' });
        return;
      }
      deckContextDispatch({ type: 'PREV_SLIDE_ELEMENT' });
    }
  }, [
    animationsWhenGoingBack,
    deckContextDispatch,
    deckContextState.currentSlideElement,
    navigateToPreviousSlide,
    sendMessageForSlideIndex
  ]);

  const keyPressCount = React.useRef(0);
  React.useEffect(
    function() {
      // Keep track of the number of next slide presses for debounce
      // Create ref for debounceing function
      const debouncedDispatch = debounce(() => {
        if (keyPressCount.current === 1) {
          goToNextSlideElement();
        } else {
          goToImmediateNextSlideElement();
        }
        keyPressCount.current = 0;
      }, 200);
      function handleKeyDown(e) {
        if (keyboardControls === 'arrows') {
          if (e.key === 'ArrowLeft') {
            goToPreviousSlideElement();
          }
          if (e.key === 'ArrowRight') {
            keyPressCount.current++;
            debouncedDispatch();
          }
        }
        if (keyboardControls === 'space') {
          if (e.code === 'Space') {
            keyPressCount.current++;
            debouncedDispatch();
            e.preventDefault();
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [
      keyboardControls,
      goToNextSlideElement,
      goToPreviousSlideElement,
      goToImmediateNextSlideElement
    ]
  );
};

export default useKeyboardControls;
