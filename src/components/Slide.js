import React from 'react';
import useSlide, { SlideContext } from '../hooks/useSlide';
import { DeckContext } from '../hooks/useDeck';

/**
 *
 *
 */

const Slide = props => {
  const [state, _] = React.useContext(DeckContext);
  const initialState = { currentSlideElement: 0 };
  const { children, slideNo } = props;
  console.log(slideNo);
  return (
    <div
      style={
        slideNo === state.currentSlide
          ? { backgroundColor: 'blue' }
          : { border: '2px solid red' }
      }
    >
      <p>{slideNo}</p>
      <SlideContext.Provider value={useSlide(initialState)}>
        {props.children}
      </SlideContext.Provider>
    </div>
  );
};

export default Slide;
