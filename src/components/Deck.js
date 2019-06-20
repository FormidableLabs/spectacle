import React from 'react';
import PropTypes from 'prop-types';

import useDeck, { DeckContext } from '../hooks/useDeck';
import isComponentType from '../utils/isComponentType.js';
import { useTransition, animated } from 'react-spring';

/**
 * Provides top level state/context provider with useDeck hook
 * Should wrap all the presentation components (slides, etc)
 *
 * Props = {
 *  loop: bool (pass in true if you want slides to loop)
 * transitionEffect: based off of react sprint useTransition
 * }
 */

const initialState = { currentSlide: 0 };

let prevSlide = initialState.currentSlide;

const Deck = ({ children, loop }) => {
  // Array of slide effects for transitioning between slides
  let slideEffects = [];
  // Our default effect for transitioning between slides
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
    }
  };
  // Check for slides and then number slides.
  const Slides = Array.isArray(children)
    ? children
        // filter if is a Slide
        .filter(x => isComponentType(x, 'Slide'))
        // map through transitionEffect props and push into slideEffects Array
        // then return a wrapped slide with the animated.div + style prop curried
        // and a slideNum prop based on iterator
        .map((x, i) => {
          slideEffects = [
            ...slideEffects,
            x.props.transitionEffect
              ? x.props.transitionEffect
              : defaultSlideEffect
          ];
          return ({ style }) => (
            <animated.div style={{ ...style }}>
              {{ ...x, props: { ...x.props, slideNum: i } }}
            </animated.div>
          );
        })
    : children;

  // Initialise useDeck hook and get state and dispatch off of it
  const [state, dispatch] = useDeck(
    initialState,
    Slides.length,
    loop ? true : false
  );

  const transitions = useTransition(
    state.currentSlide,
    p => p,
    slideEffects[state.currentSlide]
  );

  return (
    <div
      style={{
        position: 'relative',
        height: '50vh',
        width: '100%',
        overflowX: 'hidden'
      }}
    >
      <DeckContext.Provider value={[state, dispatch, Slides.length]}>
        {transitions.map(({ item, props, key }) => {
          const Slide = Slides[item];
          prevSlide = state.currentSlide;
          return <Slide style={props} />;
        })}
      </DeckContext.Provider>
    </div>
  );
};

Deck.propTypes = {
  children: PropTypes.object.isRequired,
  slideNum: PropTypes.number.isRequired,
  loop: PropTypes.bool.isRequired
};

Deck.defaultPropsTypes = {
  loop: false
};

export default Deck;
