import React from 'react';
import PropTypes from 'prop-types';
import useSlide, { SlideContext } from '../hooks/use-slide';
import { DeckContext } from '../hooks/use-deck';

/**
 * Slide component wraps anything going in a slide and maintains
 * the slides' internal state through useSlide.
 */

const baseSlideStyle = {
  height: '100vh',
  width: '100vw',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute'
};

const Slide = ({ children, slideNum, style }) => {
  const { slideElementMap } = React.useContext(DeckContext);
  const initialState = { currentSlideElement: -1, immediate: false };
  const numberOfSlideElements = slideElementMap[slideNum];

  const value = useSlide(initialState, slideNum, numberOfSlideElements);

  return (
    <div style={style || baseSlideStyle}>
      <SlideContext.Provider value={value}>{children}</SlideContext.Provider>
    </div>
  );
};

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  slideNum: PropTypes.number.isRequired,
  style: PropTypes.object
};

export default Slide;
