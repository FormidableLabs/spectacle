import * as React from 'react';
import { createBrowserHistory } from 'history';
import * as queryString from 'query-string';

export default function useUrlRouting(options) {
  const { dispatch, slideElementMap, currentSlide } = options;
  const history = React.useRef(createBrowserHistory());
  const numberOfSlides = React.useMemo(
    () => Object.getOwnPropertyNames(slideElementMap).length,
    [slideElementMap]
  );

  const onHistoryChange = React.useCallback(() => {
    const query = queryString.parse(window.location.search);
    const proposedSlideNumber = parseInt(query.slide, 10);
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
      return;
    }
    const reverseDirection = proposedSlideNumber < currentSlide;
    dispatch({
      type: 'GO_TO_SLIDE',
      payload: {
        slideNumber: proposedSlideNumber,
        reverseDirection,
        immediate: Boolean(query.immediate)
      }
    });
  }, [dispatch, numberOfSlides, currentSlide]);

  const navigateToNextSlide = React.useCallback(
    ({ immediate } = {}) => {
      const nextSafeSlideIndex = Math.min(numberOfSlides - 1, currentSlide + 1);
      const qs = queryString.stringify({
        slide: nextSafeSlideIndex,
        immediate: immediate || undefined
      });
      history.current.push(`?${qs}`);
    },
    [currentSlide, numberOfSlides]
  );

  const navigateToPreviousSlide = React.useCallback(
    ({ immediate } = {}) => {
      const previousSafeSlideIndex = Math.max(0, currentSlide - 1);
      const qs = queryString.stringify({
        slide: previousSafeSlideIndex,
        immediate: immediate || undefined
      });
      history.current.push(`?${qs}`);
    },
    [currentSlide]
  );

  React.useEffect(() => {
    const removeHistoryListener = history.current.listen(onHistoryChange);
    return () => {
      removeHistoryListener();
    };
  }, [onHistoryChange]);

  return {
    navigateToNextSlide,
    navigateToPreviousSlide,
    navigateToCurrentUrl: onHistoryChange
  };
}
