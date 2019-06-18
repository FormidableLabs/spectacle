import React from 'react';
import useSlide, { SlideContext } from '../hooks/useSlide';
import { DeckContext } from '../hooks/useDeck';
import isComponentType from '../utils/isComponentType.js';
import SlideElementWrapper from './SlideElementWrapper'

/**
 *
 *
 */

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
