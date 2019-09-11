import React from 'react';
import PropTypes from 'prop-types';
import useSlide, { SlideContext } from '../hooks/use-slide';
import styled from 'styled-components';
import { color } from 'styled-system';

const SlideContainer = styled('div')`
  ${color};
  position: relative;
  width: 100%;
  padding-top: 56.25%;
`;
const SlideWrapper = styled('div')`
  ${color};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  overflow-y: scroll;
`;
const TemplateWrapper = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

/**
 * Slide component wraps anything going in a slide and maintains
 * the slides' internal state through useSlide.
 */

const Slide = props => {
  const {
    children,
    slideNum,
    backgroundColor,
    textColor,
    template,
    numberOfSlides,
    style
  } = props;

  const value = useSlide(slideNum);
  return (
    <SlideContainer backgroundColor={backgroundColor} {...style}>
      <TemplateWrapper>
        {typeof template === 'function' &&
          template({
            slideNumber: slideNum,
            numberOfSlides: numberOfSlides - 1
          })}
      </TemplateWrapper>
      <SlideWrapper color={textColor}>
        <SlideContext.Provider value={value}>{children}</SlideContext.Provider>
      </SlideWrapper>
    </SlideContainer>
  );
};

Slide.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  numberOfSlides: PropTypes.number,
  slideNum: PropTypes.number,
  style: PropTypes.object,
  template: PropTypes.func,
  textColor: PropTypes.string
};

Slide.defaultProps = {
  textColor: 'primary',
  backgroundColor: 'tertiary'
};

export default Slide;
