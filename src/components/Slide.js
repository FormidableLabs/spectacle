import React from 'react';
import useSlide, { SlideContext } from '../hooks/useSlide';
import { DeckContext } from '../hooks/useDeck';
import isComponentType from '../utils/isComponentType.js';

/**
 *
 *
 */

export const SlideElementWrapper = props => {
  const { elementNum, transitionEffect, children } = props;
  const [state] = React.useContext(SlideContext);

  return (
    <div
      style={
        state && elementNum === state.currentSlideElement
          ? { border: '2px solid orange' }
          : { display: 'none' }
      }
    >
      Slide element:
      {children}
    </div>
  );
};

const Slide = props => {
  const [state, _] = React.useContext(DeckContext);
  const initialState = { currentSlideElement: 0 };
  const { children, slideNum } = props;

  const numberOfSlideElements = Array.isArray(children)
    ? children.filter(x => isComponentType(x, 'SlideElementWrapper')).length
    : 0;
  const isActive = slideNum === state.currentSlide;

  return (
    <div
      style={
        isActive
          ? { backgroundColor: 'lavender', border: '2px solid plum' }
          : { backgroundColor: 'snow' }
      }
    >
      <p>{slideNum}</p>
      <SlideContext.Provider
        value={useSlide(initialState, isActive, numberOfSlideElements)}
      >
        {children}
      </SlideContext.Provider>
    </div>
  );
};

export default Slide;
