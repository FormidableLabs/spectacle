import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import { SlideContext } from '../hooks/use-slide';

/**
 * SlideElementWrapper provides a component for animating slideElements
 * Anything wrapped inside will be affected by the transition.
 *
 * It is currently using useSpring but ideally we will be able to switch
 * to whatever react-spring hook a user desires!
 *
 * Note: Immediate is a React-Spring property that we pass to the animations
 * essentially it skips animations.
 */

const SlideElementWrapper = ({ elementNum, transitionEffect, children }) => {
  const [state, ,] = React.useContext(SlideContext);

  const [styleProps, set] = useSpring(() => transitionEffect.from);

  // when state changes check if the elementNum is less than/equal to currentSlideElement
  // if so trigger transition, if not then to initial!
  React.useEffect(() => {
    if (state && elementNum <= state.currentSlideElement) {
      set({
        ...transitionEffect,
        immediate: state.immediate,
        onStart: () => console.log('start element'),
        onRest: () => console.log('rest element')
      });
    } else {
      set({
        ...transitionEffect,
        to: transitionEffect.from,
        immediate: state.immediate,
        onStart: () => console.log('start element'),
        onRest: () => console.log('rest element')
      });
    }
  }, [elementNum, set, state, transitionEffect]);

  return <animated.div style={styleProps}>{children}</animated.div>;
};

SlideElementWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  elementNum: PropTypes.number.isRequired,
  transitionEffect: PropTypes.shape({
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired
  })
};

SlideElementWrapper.defaultProps = {
  transitionEffect: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  }
};

export default SlideElementWrapper;
