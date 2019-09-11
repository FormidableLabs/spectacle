import React from 'react';
import PropTypes from 'prop-types';
import useSlide, { SlideContext } from '../hooks/use-slide';
import { DeckContext } from '../hooks/use-deck';
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
    numberOfSlides
  } = props;
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
    <SlideContainer backgroundColor={backgroundColor}>
      <TemplateWrapper>
        {typeof template === 'function' &&
          template({ slideNumber: slideNum, numberOfSlides })}
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
  slideNum: PropTypes.number,
  numberOfSlides: PropTypes.number,
  template: PropTypes.func,
  textColor: PropTypes.string
};

Slide.defaultProps = {
  textColor: 'primary',
  backgroundColor: 'tertiary'
};

export default Slide;
