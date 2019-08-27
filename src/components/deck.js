import React from 'react';
import PropTypes from 'prop-types';

import useDeck, { DeckContext } from '../hooks/use-deck';
import isComponentType from '../utils/is-component-type';
import { animated, useTransition } from 'react-spring';
import {
  TransitionPipeContext,
  TransitionPipeProvider
} from '../hooks/use-transition-pipe';
import useUrlRouting from '../hooks/use-url-routing';

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
  presenterMode: false
};

const defaultSlideEffect = {
  from: {
    width: '100%',
    position: 'absolute',
    transform: 'translate(100%, 0%)'
  },
  enter: {
    width: '100%',
    position: 'absolute',
    transform: 'translate(0, 0%)'
  },
  leave: {
    width: '100%',
    position: 'absolute',
    transform: 'translate(-100%, 0%)'
  },
  config: { precision: 0 }
};

const Deck = ({ children, loop, keyboardControls, ...rest }) => {
  const { runTransition } = React.useContext(TransitionPipeContext);

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

  const {
    navigateToNextSlide,
    navigateToPreviousSlide,
    navigateToCurrentUrl
  } = useUrlRouting({
    dispatch,
    currentSlide: state.currentSlide,
    currentSlideElement: state.currentSlideElement,
    presenterMode: state.presenterMode,
    slideElementMap,
    loop
  });

  const userTransitionEffect =
    filteredChildren[state.currentSlide].props.transitionEffect || {};
  const transitionRef = React.useRef(null);

  React.useEffect(() => {
    /***
     * This will look at the current query string and navigate to whatever
     * slide is specified, otherwise start at 0. This only runs once per mount
     * of Deck, which should be the entire lifecyle of the slideshow.
     */
    navigateToCurrentUrl();
  }, [navigateToCurrentUrl]);

  React.useEffect(() => {
    if (!transitionRef.current) {
      return;
    }
    runTransition(transitionRef.current);
  }, [transitionRef, state.currentSlide, runTransition]);

  const transitions = useTransition(state.currentSlide, p => p, {
    ref: transitionRef,
    enter: () => userTransitionEffect.enter || defaultSlideEffect.enter,
    leave: userTransitionEffect.leave || defaultSlideEffect.leave,
    from: userTransitionEffect.from || defaultSlideEffect.from,
    unique: true,
    immediate: state.immediate
  });

  const slides = transitions.map(({ item, props, key }) => (
    <animated.div style={props} key={key}>
      {React.cloneElement(filteredChildren[item], {
        slideNum: item,
        keyboardControls
      })}
    </animated.div>
  ));

  return (
    <div
      style={{
        position: 'relative',
        height: '50vh',
        width: '100%',
        overflowX: 'hidden'
      }}
    >
      <DeckContext.Provider
        value={{
          state,
          dispatch,
          numberOfSlides: slides.length,
          keyboardControls,
          animationsWhenGoingBack: rest.animationsWhenGoingBack,
          slideElementMap,
          navigateToNextSlide,
          navigateToPreviousSlide
        }}
      >
        {slides}
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

export default function ConnectedDeck(props) {
  return (
    <TransitionPipeProvider>
      <Deck {...props} />
    </TransitionPipeProvider>
  );
}
