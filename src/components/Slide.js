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

  const numberOfSlideElements =
    typeof props.children === 'Array'
      ? props.children.filter(x =>
          Object.keys(x.props).includes('slide-element')
        )
      : 0;

  const isActive = slideNo === state.currentSlide;

  const SlideElements = Array.isArray(props.children)
    ? props.children.map((x, i) => {
        if (Object.keys(x.props).includes('slide-element')) {
          return {
            ...x,
            props: {
              ...x.props,
              'slide-element': i,
              style:
                x.props['slide-element'] === state.currentSlideElement
                  ? { backgroundColor: 'orange' }
                  : { border: '2px solid red' }
            }
          };
        }
      })
    : props.children;
  return (
    <div
      style={
        isActive ? { backgroundColor: 'blue' } : { border: '2px solid red' }
      }
    >
      <p>{slideNo}</p>
      <SlideContext.Provider
        value={useSlide(initialState, isActive, numberOfSlideElements)}
      >
        {SlideElements}
      </SlideContext.Provider>
    </div>
  );
};

export default Slide;
