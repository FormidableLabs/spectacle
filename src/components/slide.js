import React from 'react';
import PropTypes from 'prop-types';
import useSlide, { SlideContext } from '../hooks/use-slide';
import { DeckContext } from '../hooks/use-deck';
import styled from 'styled-components';
import { color } from 'styled-system';

const SlideWrapper = styled('div')`
  ${color};
  min-height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
`;

/**
 * Slide component wraps anything going in a slide and maintains
 * the slides' internal state through useSlide.
 */

const Slide = props => {
  const { children, slideNum, backgroundColor, textColor } = props;
  const { slideElementMap, keyboardControls } = React.useContext(DeckContext);
  const initialState = { currentSlideElement: 0, immediate: false };
  const numberOfSlideElements = slideElementMap[slideNum];
  const value = useSlide(
    initialState,
    slideNum,
    numberOfSlideElements,
    keyboardControls
  );
  return (
    <SlideWrapper backgroundColor={backgroundColor} color={textColor}>
      <SlideContext.Provider value={value}>{children}</SlideContext.Provider>
    </SlideWrapper>
  );
};

Slide.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  slideNum: PropTypes.number.isRequired,
  textColor: PropTypes.string
};

Slide.defaultProps = {
  textColor: 'primary',
  backgroundColor: 'tertiary'
};

export default Slide;
