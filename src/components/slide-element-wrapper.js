import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
<<<<<<< HEAD:src/components/slide-element-wrapper.js

import { SlideContext } from '../hooks/use-slide';

=======
import { DeckContext } from '../hooks/useDeck';
import { AnimationMutexContext } from '../hooks/useMutex';
>>>>>>> Refactor deck reducer to handle slide element transitions:src/components/SlideElementWrapper.js
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
  const [state] = React.useContext(DeckContext);
  const { signal } = React.useContext(AnimationMutexContext);
  const [styleProps, set] = useSpring(() => transitionEffect.from);

  React.useEffect(() => {
    if (state && state.currentSlideElement === elementNum) {
      set({
        ...transitionEffect,
        immediate: state.immediateElement,
        onRest: () => signal()
      });
    }
  }, [elementNum, set, signal, state, transitionEffect]);

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
