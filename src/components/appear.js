import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { TransitionPipeContext } from '../hooks/use-transition-pipe';
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

const Appear = ({ elementNum, transitionEffect, children }) => {
  const {
    state: { currentSlideElement, reverseDirection, immediate }
  } = React.useContext(SlideContext);

  const { signal } = React.useContext(TransitionPipeContext);
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
    if (activeElement && !reverseDirection) {
      set({
        ...transitionEffect.to,
        immediate
      });
    } else if (reverseDirection && previousElement) {
      set({
        ...transitionEffect.from,
        immediate
      });
    }
  }, [
    activeElement,
    elementNum,
    immediate,
    previousElement,
    reverseDirection,
    set,
    signal,
    transitionEffect,
    upcomingElement
  ]);

  return <animated.div style={styleProps}>{children}</animated.div>;
};

Appear.propTypes = {
  children: PropTypes.node.isRequired,
  elementNum: PropTypes.number.isRequired,
  transitionEffect: PropTypes.shape({
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired
  })
};

Appear.defaultProps = {
  transitionEffect: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  }
};

export default Appear;
