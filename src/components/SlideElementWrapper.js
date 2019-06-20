import React from 'react';

import useSlide, { SlideContext } from '../hooks/useSlide';

const SlideElementWrapper = props => {
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
      {children}
    </div>
  );
};

export default SlideElementWrapper;
