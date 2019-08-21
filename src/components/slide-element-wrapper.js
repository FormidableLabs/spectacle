import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
<<<<<<< HEAD:src/components/slide-element-wrapper.js

import { SlideContext } from '../hooks/use-slide';

=======
import { DeckContext } from '../hooks/useDeck';
import { AnimationMutexContext } from '../hooks/useMutex';
<<<<<<< HEAD:src/components/slide-element-wrapper.js
>>>>>>> Refactor deck reducer to handle slide element transitions:src/components/SlideElementWrapper.js
=======

>>>>>>> Finished previous animations:src/components/SlideElementWrapper.js
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
  const [
    { reverseDirection, currentSlideElement, immediateElement }
  ] = React.useContext(DeckContext);
  const { signal } = React.useContext(AnimationMutexContext);
  const activeElement = elementNum === currentSlideElement;
  const upcomingElement =
    (elementNum > currentSlideElement && !reverseDirection) ||
    (elementNum < currentSlideElement && reverseDirection);
  const previousElement =
    (elementNum < currentSlideElement && !reverseDirection) ||
    (elementNum > currentSlideElement && reverseDirection);

  const [styleProps, set] = useSpring(() => {
    if ((activeElement || upcomingElement) && !previousElement) {
      return reverseDirection ? transitionEffect.to : transitionEffect.from;
    } else if (previousElement) {
      return reverseDirection ? transitionEffect.from : transitionEffect.to;
    } else {
      return transitionEffect.to;
    }
  });

  React.useEffect(() => {
    if (activeElement) {
      set({
        ...transitionEffect.to,
        immediate: immediateElement,
        onRest: () => signal()
      });
    } else if (reverseDirection && previousElement) {
      set({
        ...transitionEffect.from,
        immediate: immediateElement,
        onRest: () => signal()
      });
    } else if (reverseDirection && upcomingElement) {
      set({
        ...transitionEffect.to,
        immediate: immediateElement,
        onRest: () => signal()
      });
    }
  }, [
    activeElement,
    elementNum,
    immediateElement,
    previousElement,
    reverseDirection,
    set,
    signal,
    transitionEffect,
    upcomingElement
  ]);

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
