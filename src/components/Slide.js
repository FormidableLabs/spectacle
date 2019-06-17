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
  const { children, slideNum } = props;

  const numberOfSlideElements = Array.isArray(props.children)
    ? props.children.filter(x => x.props['slide-element']).length
    : 0;
  const isActive = slideNum === state.currentSlide;

  const SlideElements = Array.isArray(props.children)
    ? props.children.map((x, i) => {
        if (x.props['slide-element']) {
          return {
            ...x,
            props: {
              ...x.props,
              'slide-element': i,
              style:
                x.props['slide-element'] === state.currentSlideElement
                  ? { border: '2px solid orange' }
                  : { border: '2px solid green' }
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
      <p>{slideNum}</p>
      <SlideContext.Provider
        value={useSlide(initialState, isActive, numberOfSlideElements)}
      >
        {SlideElements}
      </SlideContext.Provider>
    </div>
  );
};

export default Slide;
