import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { DeckContext } from '../hooks/use-deck';
import { TransitionPipeContext } from '../hooks/use-transition-pipe';

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
    state: { reverseDirection, currentSlideElement, immediateElement }
  } = React.useContext(DeckContext);
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
        immediate: immediateElement
      });
    } else if (reverseDirection && previousElement) {
      set({
        ...transitionEffect.from,
        immediate: immediateElement
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
