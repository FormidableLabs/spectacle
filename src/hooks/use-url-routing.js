import * as React from 'react';
import { createBrowserHistory } from 'history';
import * as queryString from 'query-string';

export default function useUrlRouting(options) {
  const {
    dispatch,
    slideElementMap,
    currentSlide,
    currentSlideElement,
    currentPresenterMode,
    loop,
    animationsWhenGoingBack,
    onUrlChange
  } = options;

  const history = React.useRef(createBrowserHistory());

  const numberOfSlides = React.useMemo(
    () => Object.getOwnPropertyNames(slideElementMap).length,
    [slideElementMap]
  );

  const countSlideElements = React.useCallback(
    slideNumber => slideElementMap[slideNumber],
    [slideElementMap]
  );

  const isSlideOutOfBounds = React.useCallback(
    proposedSlideNumber => {
      return (
        isNaN(proposedSlideNumber) || numberOfSlides - 1 < proposedSlideNumber
      );
    },
    [numberOfSlides]
  );

  const isSlideElementOutOfBounds = React.useCallback(
    (proposedSlideElementNumber, slideElementsLength) => {
      const val =
        isNaN(proposedSlideElementNumber) ||
        proposedSlideElementNumber >= slideElementsLength ||
        proposedSlideElementNumber < -1;
      return val;
    },
    []
  );

  const stateFromUrl = React.useCallback(
    url => {
      const query = queryString.parse(url);
      const immediate = Boolean(query.immediate);
      const presenterMode = Boolean(query.presenterMode);
      const proposedSlideNumber = parseInt(query.slide, 10);
      const proposedSlideElementNumber = parseInt(query.slideElement, 10);
      const slideNumber = isSlideOutOfBounds(proposedSlideNumber)
        ? 0
        : proposedSlideNumber;
      const slideElementsLength = countSlideElements(slideNumber);
      const slideElementNumber = isSlideElementOutOfBounds(
        proposedSlideElementNumber,
        slideElementsLength
      )
        ? -1
        : proposedSlideElementNumber;

      return {
        immediate,
        presenterMode,
        proposedSlideNumber,
        proposedSlideElementNumber,
        slideNumber,
        slideElementNumber
      };
    },
    [countSlideElements, isSlideElementOutOfBounds, isSlideOutOfBounds]
  );

  const onHistoryChange = React.useCallback(() => {
    const {
      slideNumber,
      slideElementNumber,
      proposedSlideNumber,
      proposedSlideElementNumber,
      presenterMode,
      immediate
    } = stateFromUrl(window.location.search);

    /**
     * If the proposed URL slide index is out-of-bounds or is not a valid
     * integer, navigate to the first slide. Do nothing if the proposed slide
     * number is the same as the current slide.
     */
    if (
      proposedSlideNumber !== slideNumber ||
      proposedSlideElementNumber !== slideElementNumber
    ) {
      const qs = queryString.stringify({
        slide: slideNumber,
        slideElement: slideElementNumber
      });
      history.current.replace(`?${qs}`);
      return;
    }
    const reverseDirection =
      slideNumber < currentSlide || slideElementNumber < currentSlideElement;
    const update = {
      slideNumber,
      slideElementNumber,
      reverseDirection,
      immediate
    };
    dispatch({
      type: 'GO_TO_SLIDE',
      payload: {
        ...update,
        presenterMode
      }
    });
    onUrlChange(update);
  }, [stateFromUrl, currentSlide, currentSlideElement, dispatch, onUrlChange]);

  const nextSafeSlide = React.useCallback(() => {
    if (currentSlide + 1 > numberOfSlides - 1 && loop) {
      return 0;
    }
    return Math.min(currentSlide + 1, numberOfSlides - 1);
  }, [currentSlide, loop, numberOfSlides]);

  const navigateToNext = React.useCallback(
    ({ immediate } = {}) => {
      const slideElementsLength = countSlideElements(currentSlide);
      const atLastElement =
        currentSlideElement + 1 === slideElementsLength ||
        slideElementsLength === 0;
      const atLastSlide =
        currentSlide + 1 === numberOfSlides || numberOfSlides === 0;

      let nextSafeSlideIndex = currentSlide;
      let nextSafeSlideElementIndex = -1;
      if (atLastElement && atLastSlide) {
        if (!loop) {
          return;
        }
        nextSafeSlideIndex = 0;
        nextSafeSlideElementIndex = -1;
      } else if (atLastElement) {
        // advance to the next safe slide
        nextSafeSlideIndex = nextSafeSlide();
        nextSafeSlideElementIndex = -1;
      } else {
        // advance to the next slide element
        nextSafeSlideElementIndex = currentSlideElement + 1;
      }

      const qs = queryString.stringify({
        slide: nextSafeSlideIndex,
        slideElement: nextSafeSlideElementIndex,
        immediate: immediate || undefined,
        presenterMode: currentPresenterMode || undefined
      });
      history.current.push(`?${qs}`);
    },
    [
      countSlideElements,
      currentPresenterMode,
      currentSlide,
      currentSlideElement,
      loop,
      nextSafeSlide,
      numberOfSlides
    ]
  );

  const previousSafeSlide = React.useCallback(() => {
    if (currentSlide - 1 < 0 && loop) {
      return numberOfSlides - 1;
    }
    return Math.max(0, currentSlide - 1);
  }, [currentSlide, loop, numberOfSlides]);

  const navigateToPrevious = React.useCallback(() => {
    const immediate = !animationsWhenGoingBack;
    const slideElementsLength = countSlideElements(currentSlide);
    const atNoElement = currentSlideElement === -1 || slideElementsLength === 0;
    const atFirstSlide = currentSlide === 0 || numberOfSlides === 0;

    let previousSafeSlideIndex = currentSlide;
    let previousSafeSlideElementIndex = -1;

    if (atNoElement && atFirstSlide) {
      if (!loop) {
        return;
      }
      previousSafeSlideIndex = numberOfSlides - 1;
    } else if (currentSlideElement < 0) {
      // back up to the previous safe slide
      previousSafeSlideIndex = previousSafeSlide();
      previousSafeSlideElementIndex =
        countSlideElements(previousSafeSlideIndex) - 1;
    } else {
      // back up to the previous slide element
      previousSafeSlideElementIndex = currentSlideElement - 1;
    }

    const qs = queryString.stringify({
      slide: previousSafeSlideIndex,
      slideElement: previousSafeSlideElementIndex,
      immediate: immediate || undefined,
      presenterMode: currentPresenterMode || undefined
    });
    history.current.push(`?${qs}`);
  }, [
    animationsWhenGoingBack,
    countSlideElements,
    currentPresenterMode,
    currentSlide,
    currentSlideElement,
    loop,
    numberOfSlides,
    previousSafeSlide
  ]);

  React.useEffect(() => {
    const removeHistoryListener = history.current.listen(onHistoryChange);
    return () => {
      removeHistoryListener();
    };
  }, [onHistoryChange]);

  /**
   * In order for Deck to render the correct type of sub-deck,
   * we need for certain state from the url to be written to the
   * DeckContext. For example, we need to know whether or not this
   * browser is in presenter mode.
   */
  React.useEffect(
    () => {
      onHistoryChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return {
    navigateToNext,
    navigateToPrevious
  };
}
