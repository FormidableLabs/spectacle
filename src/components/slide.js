import React from 'react';
import PropTypes from 'prop-types';
import useSlide, { SlideContext } from '../hooks/use-slide';
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
  const { children, slideNum, backgroundColor, textColor, style } = props;
  const value = useSlide(slideNum);
  return (
    <SlideWrapper
      backgroundColor={backgroundColor}
      color={textColor}
      {...style}
    >
      <SlideContext.Provider value={value}>{children}</SlideContext.Provider>
    </SlideWrapper>
  );
};

Slide.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  slideNum: PropTypes.number.isRequired,
  style: PropTypes.object,
  textColor: PropTypes.string
};

Slide.defaultProps = {
  textColor: 'primary',
  backgroundColor: 'tertiary'
};

export default Slide;
