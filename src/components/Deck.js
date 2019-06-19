import React from 'react';
import useDeck, { DeckContext } from '../hooks/useDeck';
import isComponentType from '../utils/isComponentType.js';
import { useTransition, animated } from 'react-spring';

/**
 * Provides top level state/context provider with useDeck hook
 * Should wrap all the presentation components (slides, etc)
 *
 * Props = {
 *  loop: bool (pass in true if you want slides to loop)
 * }
 */

const initialState = { currentSlide: 0 };

let prevSlide = initialState.currentSlide;

const Deck = props => {
  // Check for slides and then number slides.
  const Slides = Array.isArray(props.children)
    ? props.children
        .filter(x => isComponentType(x, 'Slide'))
        /** One idea is to remove the above filter, and use the `else`
         * in the map below to allow non-Slide elements to always appear.
         * At the moment, these break the slide navigation as this hook
         * is only used by the slides...
         */
        .map((x, i) => {
          if (isComponentType(x, 'Slide')) {
            return { ...x, props: { ...x.props, slideNum: i } };
          } else {
            return x;
          }
        })
        .map(x => ({ style }) => (
          <animated.div style={{ ...style }}>{x}</animated.div>
        ))
    : props.children;

  // Initialise useDeck hook and get state and dispatch off of it
  const [state, dispatch] = useDeck(
    initialState,
    Slides.length,
    props.loop ? true : false
  );

  const transitions = useTransition(
    state.currentSlide,
    p => p,
    state.currentSlide > prevSlide
      ? {
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
        }
      : {
          from: {
            width: '100%',
            position: 'absolute',
            transform: 'translate(-100%, 0%)'
          },
          enter: {
            width: '100%',
            position: 'absolute',
            transform: 'translate(0, 0%)'
          },
          leave: {
            width: '100%',
            position: 'absolute',
            transform: 'translate(100%, 0%)'
          }
        }
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

export default Deck;
