import * as React from 'react';
import { createBrowserHistory } from 'history';
import * as queryString from 'query-string';
import {
  DEFAULT_SLIDE_ELEMENT_INDEX,
  DEFAULT_SLIDE_INDEX
} from '../utils/constants';

export default function useUrlRouting(options) {
  const {
    dispatch,
    slideElementMap,
    currentSlide,
    currentSlideElement,
    currentPresenterMode,
    currentOverviewMode,
    currentExportMode,
    currentPrintMode,
    loop,
    animationsWhenGoingBack,
    onUrlChange,
    customHistory
  } = options;

  const history = React.useRef(customHistory || createBrowserHistory());

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
        proposedSlideElementNumber < DEFAULT_SLIDE_ELEMENT_INDEX;
      return val;
    },
    []
  );

  const stateFromUrl = React.useCallback(
    url => {
      const query = queryString.parse(url);
      const immediate = Boolean(query.immediate);
      const presenterMode = Boolean(query.presenterMode);
      const exportMode = Boolean(query.exportMode);
      const printMode = Boolean(query.printMode);
      const overviewMode = Boolean(query.overviewMode);
      const proposedSlideNumber = parseInt(query.slide, 10);
      const proposedSlideElementNumber = parseInt(query.slideElement, 10);
      const slideNumber = isSlideOutOfBounds(proposedSlideNumber)
        ? DEFAULT_SLIDE_INDEX
        : proposedSlideNumber;
      const slideElementsLength = countSlideElements(slideNumber);
      const slideElementNumber = isSlideElementOutOfBounds(
        proposedSlideElementNumber,
        slideElementsLength
      )
        ? DEFAULT_SLIDE_ELEMENT_INDEX
        : proposedSlideElementNumber;

      if (overviewMode && presenterMode) {
        throw new Error(
          'Presenter Mode and Overview Mode cannot be used at the same time.'
        );
      }

      return {
        immediate,
        presenterMode,
        overviewMode,
        proposedSlideNumber,
        proposedSlideElementNumber,
        slideNumber,
        slideElementNumber,
        exportMode,
        printMode
      };
    },
    [countSlideElements, isSlideElementOutOfBounds, isSlideOutOfBounds]
  );

  const goToSlide = React.useCallback(
    (slideNumber, immediate = true) => {
      const qs = queryString.stringify({
        presenterMode: currentPresenterMode || undefined,
        overviewMode: currentOverviewMode || undefined,
        exportMode: currentExportMode || undefined,
        immediate: immediate,
        slide: slideNumber,
        slideElement: DEFAULT_SLIDE_ELEMENT_INDEX,
        printMode: currentPrintMode || undefined
      });
      history.current.push(`?${qs}`);
    },
    [
      currentPresenterMode,
      currentOverviewMode,
      currentExportMode,
      currentPrintMode
    ]
  );

  const onHistoryChange = React.useCallback(() => {
    const {
      slideNumber,
      slideElementNumber,
      proposedSlideNumber,
      proposedSlideElementNumber,
      presenterMode,
      overviewMode,
      immediate,
      exportMode,
      printMode
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
        slideElement: slideElementNumber,
        immediate: immediate || undefined,
        presenterMode: presenterMode || undefined,
        overviewMode: overviewMode || undefined,
        exportMode: exportMode || undefined,
        printMode: printMode || undefined
      });
      history.current.replace(`?${qs}`);
      return;
    }
    const reverseDirection =
      slideNumber < currentSlide ||
      (slideNumber == currentSlide && slideElementNumber < currentSlideElement);
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
        presenterMode,
        overviewMode,
        exportMode,
        printMode
      }
    });
    onUrlChange(update);
  }, [stateFromUrl, currentSlide, currentSlideElement, dispatch, onUrlChange]);

  const nextSafeSlide = React.useCallback(() => {
    if (currentSlide + 1 > numberOfSlides - 1 && loop) {
      return DEFAULT_SLIDE_INDEX;
    }
    return Math.min(currentSlide + 1, numberOfSlides - 1);
  }, [currentSlide, loop, numberOfSlides]);

  /**
   * This method will navigate to whatever index is specified. It is for
   * internal use only, such as presenter mode, as it does not check bounds.
   */
  const navigateTo = React.useCallback(
    ({ slideIndex, elementIndex, immediate = false }) => {
      const qs = queryString.stringify({
        slide: slideIndex,
        slideElement: elementIndex,
        immediate: immediate || undefined,
        presenterMode: currentPresenterMode || undefined,
        overviewMode: currentOverviewMode || undefined,
        exportMode: currentExportMode || undefined,
        printMode: currentPrintMode || undefined
      });
      history.current.push(`?${qs}`);
    }
  );

  const navigateToNext = React.useCallback(
    ({ immediate } = {}) => {
      const slideElementsLength = countSlideElements(currentSlide);
      const atLastElement =
        currentSlideElement + 1 === slideElementsLength ||
        slideElementsLength === 0;
      const atLastSlide =
        currentSlide + 1 === numberOfSlides || numberOfSlides === 0;

      let nextSafeSlideIndex = currentSlide;
      let nextSafeSlideElementIndex = DEFAULT_SLIDE_ELEMENT_INDEX;
      if (atLastElement && atLastSlide) {
        if (!loop) {
          return;
        }
        nextSafeSlideIndex = DEFAULT_SLIDE_INDEX;
        nextSafeSlideElementIndex = DEFAULT_SLIDE_ELEMENT_INDEX;
      } else if (atLastElement) {
        // advance to the next safe slide
        nextSafeSlideIndex = nextSafeSlide();
        nextSafeSlideElementIndex = DEFAULT_SLIDE_ELEMENT_INDEX;
      } else {
        // advance to the next slide element
        nextSafeSlideElementIndex = currentSlideElement + 1;
      }

      const qs = queryString.stringify({
        slide: nextSafeSlideIndex,
        slideElement: nextSafeSlideElementIndex,
        immediate: immediate || undefined,
        presenterMode: currentPresenterMode || undefined,
        overviewMode: currentOverviewMode || undefined,
        exportMode: currentExportMode || undefined,
        printMode: currentPrintMode || undefined
      });
      history.current.push(`?${qs}`);
    },
    [
      countSlideElements,
      currentSlide,
      currentSlideElement,
      numberOfSlides,
      currentPresenterMode,
      currentOverviewMode,
      currentExportMode,
      currentPrintMode,
      loop,
      nextSafeSlide
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
    const atNoElement =
      currentSlideElement === DEFAULT_SLIDE_ELEMENT_INDEX ||
      slideElementsLength === 0;
    const atFirstSlide = currentSlide === 0 || numberOfSlides === 0;

    let previousSafeSlideIndex = currentSlide;
    let previousSafeSlideElementIndex = DEFAULT_SLIDE_ELEMENT_INDEX;

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
      presenterMode: currentPresenterMode || undefined,
      overviewMode: currentOverviewMode || undefined,
      exportMode: currentExportMode || undefined
    });
    history.current.push(`?${qs}`);
  }, [
    animationsWhenGoingBack,
    countSlideElements,
    currentSlide,
    currentSlideElement,
    numberOfSlides,
    currentPresenterMode,
    currentOverviewMode,
    currentExportMode,
    loop,
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

  const toggleMode = React.useCallback(
    s => dispatch({ type: 'TOGGLE_MODE', payload: { mode: s } }),
    [dispatch]
  );

  return {
    navigateToNext,
    navigateToPrevious,
    navigateTo,
    toggleMode,
    goToSlide
  };
}
