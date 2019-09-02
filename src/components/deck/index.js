import React from 'react';
import PropTypes from 'prop-types';

import useDeck, { DeckContext } from '../../hooks/use-deck';
import isComponentType from '../../utils/is-component-type';
import useUrlRouting from '../../hooks/use-url-routing';
import PresenterDeck from './presenter-deck';
import MainDeck from './main-deck';

/**
 * Provides top level state/context provider with useDeck hook
 * Should wrap all the presentation components (slides, etc)
 *
 * Props = {
 *  loop: bool (pass in true if you want slides to loop)
 * transitionEffect: based off of react sprint useTransition
 * }
 *
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */

const initialState = {
  currentSlide: 0,
  immediate: false,
  immediateElement: false,
  currentSlideElement: 0,
  reverseDirection: false,
  presenterMode: false,
  currentNotes: null
};

const Deck = ({ children, loop, keyboardControls, ...rest }) => {
  const [resolvedInitialUrl, setResolvedInitialUrl] = React.useState(false);

  // Check for slides and then number slides.
  const filteredChildren = Array.isArray(children)
    ? children.filter(x => isComponentType(x, 'Slide'))
    : console.error('No children passed') || [];

  const slideElementMap = React.useMemo(() => {
    const map = {};
    filteredChildren.filter((slide, index) => {
      map[index] = Array.isArray(slide.props.children)
        ? slide.props.children.reduce((memo, current) => {
            if (isComponentType(current, 'SlideElementWrapper')) {
              memo += 1;
            }
            return memo;
          }, 0)
        : 0;
    });
    return map;
  }, [filteredChildren]);

  // Initialise useDeck hook and get state and dispatch off of it
  const { state, dispatch } = useDeck(
    initialState,
    filteredChildren.length,
    !!loop,
    rest.animationsWhenGoingBack,
    slideElementMap
  );

  const onInitializedState = React.useCallback(
    () => setResolvedInitialUrl(true),
    []
  );

  const {
    navigateToNextSlide,
    navigateToPreviousSlide,
    navigateToCurrentUrl,
    registerSlideChangeCallback
  } = useUrlRouting({
    dispatch,
    currentSlide: state.currentSlide,
    currentSlideElement: state.currentSlideElement,
    presenterMode: state.presenterMode,
    slideElementMap,
    loop,
    onInitializedState
  });

  React.useLayoutEffect(() => {
    document.body.style.margin = '0';
  }, []);

  let content = null;
  if (resolvedInitialUrl) {
    content = state.presenterMode ? (
      <PresenterDeck>{filteredChildren}</PresenterDeck>
    ) : (
      <MainDeck>{filteredChildren}</MainDeck>
    );
  }

  return (
    <div>
      <DeckContext.Provider
        value={{
          state,
          dispatch,
          numberOfSlides: filteredChildren.length,
          keyboardControls,
          animationsWhenGoingBack: rest.animationsWhenGoingBack,
          slideElementMap,
          navigateToNextSlide,
          navigateToPreviousSlide,
          navigateToCurrentUrl,
          registerSlideChangeCallback
        }}
      >
        {content}
      </DeckContext.Provider>
    </div>
  );
};

Deck.propTypes = {
  animationsWhenGoingBack: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  keyboardControls: PropTypes.oneOf(['arrows', 'space']),
  loop: PropTypes.bool.isRequired
};

Deck.defaultProps = {
  loop: false,
  keyboardControls: 'arrows',
  animationsWhenGoingBack: false
};

export default Deck;
