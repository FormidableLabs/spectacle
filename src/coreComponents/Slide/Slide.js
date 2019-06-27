import React from 'react';
import PropTypes from 'prop-types';

import useSlide, { SlideContext } from '../../hooks/useSlide';
import { DeckContext } from '../../hooks/useDeck';
import isComponentType from '../../utils/isComponentType.js';
import { SlideContainer } from './Slide.style';

/**
 * Slide component wraps anything going in a slide and maintains
 * the slides' internal state through useSlide.
 */

export const Slide = ({ children, slideNum }) => {
  const [, , , keyboardControls] = React.useContext(DeckContext);
  const initialState = { currentSlideElement: 0, immediate: false };

  const numberOfSlideElements = Array.isArray(children)
    ? children.filter(x => isComponentType(x, 'SlideElementWrapper')).length
    : 0;

  return (
    <SlideContainer>
      <SlideContext.Provider
        value={useSlide(
          initialState,
          slideNum,
          numberOfSlideElements,
          keyboardControls
        )}
      >
        {children}
      </SlideContext.Provider>
    </SlideContainer>
  );
};

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  slideNum: PropTypes.number.isRequired
};
