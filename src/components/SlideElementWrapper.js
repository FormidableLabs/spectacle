import React from 'react';
import { useSpring, animated } from 'react-spring';

import useSlide, { SlideContext } from '../hooks/useSlide';

/**
 *
 *
 */

const SlideElementWrapper = props => {
  const { elementNum, transitionEffect, children } = props;
  const [state] = React.useContext(SlideContext);

  const [styleProps, set] = useSpring(() =>
    transitionEffect
      ? console.log(transitionEffect.from) || transitionEffect.from
      : { opacity: 0 }
  );

  React.useEffect(() => {
    if (state && elementNum <= state.currentSlideElement) {
      if (transitionEffect) {
        console.log(transitionEffect.to);
        set({
          to: transitionEffect.to
        });
      }
      set({
        opacity: 1
      });
    }
  }, [state]);

  return <animated.div style={styleProps}>{children}</animated.div>;
};

export default SlideElementWrapper;
