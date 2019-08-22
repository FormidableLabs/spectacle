import React from 'react';
import PropTypes from 'prop-types';
import useSlide, { SlideContext } from '../hooks/use-slide';
import { DeckContext } from '../hooks/use-deck';

/**
 * Slide component wraps anything going in a slide and maintains
 * the slides' internal state through useSlide.
 */

const Slide = ({ children, slideNum }) => {
  const [, , , keyboardControls, , slideElementMap] = React.useContext(
    DeckContext
  );
  const initialState = { currentSlideElement: 0, immediate: false };
  const numberOfSlideElements = slideElementMap[slideNum];

  const value = useSlide(
    initialState,
    slideNum,
    numberOfSlideElements,
    keyboardControls
  );

  return (
    <div
      style={{
        backgroundColor: 'lavender',
        border: '2px solid plum',
        overflow: 'hidden'
      }}
    >
      <p>{slideNum}</p>
      <SlideContext.Provider value={value}>{children}</SlideContext.Provider>
    </div>
  );
};

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  slideNum: PropTypes.number.isRequired
};

export default Slide;
