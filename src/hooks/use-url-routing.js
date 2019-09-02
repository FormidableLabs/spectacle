import * as React from 'react';
import { createBrowserHistory } from 'history';
import * as queryString from 'query-string';

export default function useUrlRouting(options) {
  const {
    dispatch,
    slideElementMap,
    currentSlide,
    loop,
    presenterMode,
    onInitializedState
  } = options;
  const history = React.useRef(createBrowserHistory());
  const numberOfSlides = React.useMemo(
    () => Object.getOwnPropertyNames(slideElementMap).length,
    [slideElementMap]
  );

  const slideChangeCallback = React.useRef(null);

  /**
   * In order for Deck to render the correct type of sub-deck,
   * we need for certain state from the url to be written to the
   * DeckContext. For example, we need to know whether or not this
   * browser is in presenter mode.
   */
  React.useEffect(() => {
    const query = queryString.parse(window.location.search);
    const queryPresenterMode = Boolean(query.presenterMode);
    dispatch({
      type: 'SET_PRESENTER_MODE',
      payload: { presenterMode: queryPresenterMode }
    });
    onInitializedState && onInitializedState();
  }, [dispatch, onInitializedState]);

  const onHistoryChange = React.useCallback(() => {
    const query = queryString.parse(window.location.search);
    const proposedSlideNumber = parseInt(query.slide, 10);
    const queryPresenterMode = Boolean(query.presenterMode);

    /**
     * If the proposed URL slide index is out-of-bounds or is not a valid
     * integer, navigate to the first slide. Do nothing if the proposed slide
     * number is the same as the current slide.
     */
    if (
      isNaN(proposedSlideNumber) ||
      numberOfSlides - 1 < proposedSlideNumber
    ) {
      const qs = queryString.stringify({ slide: 0 });
      history.current.replace(`?${qs}`);
      return;
    }
    if (proposedSlideNumber === currentSlide) {
      dispatch({
        type: 'SET_PRESENTER_MODE',
        payload: { presenterMode: queryPresenterMode }
      });
      return;
    }
    const reverseDirection = proposedSlideNumber < currentSlide;
    dispatch({
      type: 'GO_TO_SLIDE',
      payload: {
        slideNumber: proposedSlideNumber,
        reverseDirection,
        immediate: Boolean(query.immediate),
        presenterMode: queryPresenterMode
      }
    });
    console.log('should do callback');
    slideChangeCallback.current &&
      slideChangeCallback.current(proposedSlideNumber);
  }, [dispatch, numberOfSlides, currentSlide]);

  const navigateToNextSlide = React.useCallback(
    ({ immediate } = {}) => {
      let nextSafeSlideIndex;
      if (currentSlide + 1 > numberOfSlides - 1 && loop) {
        nextSafeSlideIndex = 0;
      } else {
        nextSafeSlideIndex = Math.min(currentSlide + 1, numberOfSlides - 1);
      }
      const qs = queryString.stringify({
        slide: nextSafeSlideIndex,
        immediate: immediate || undefined,
        presenterMode: presenterMode || undefined
      });
      history.current.push(`?${qs}`);
    },
    [currentSlide, loop, numberOfSlides, presenterMode]
  );

  const navigateToPreviousSlide = React.useCallback(
    ({ immediate } = {}) => {
      let previousSafeSlideIndex;
      if (currentSlide - 1 < 0 && loop) {
        previousSafeSlideIndex = numberOfSlides - 1;
      } else {
        previousSafeSlideIndex = Math.max(0, currentSlide - 1);
      }
      const qs = queryString.stringify({
        slide: previousSafeSlideIndex,
        immediate: immediate || undefined,
        presenterMode: presenterMode || undefined
      });
      history.current.push(`?${qs}`);
    },
    [currentSlide, loop, numberOfSlides, presenterMode]
  );

  React.useEffect(() => {
    const removeHistoryListener = history.current.listen(onHistoryChange);
    return () => {
      removeHistoryListener();
    };
  }, [onHistoryChange]);

  const registerSlideChangeCallback = React.useCallback(onSlideChange => {
    slideChangeCallback.current = onSlideChange;
    console.log('registering', onSlideChange);
    return () =>
      console.log('deregistering...') || (slideChangeCallback.current = null);
  }, []);

  return {
    navigateToNextSlide,
    navigateToPreviousSlide,
    navigateToCurrentUrl: onHistoryChange,
    registerSlideChangeCallback
  };
}
