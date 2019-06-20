import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

import useSlide, { SlideContext } from '../hooks/useSlide';

/**
 * SlideElementWrapper provides a component for animating slideElements
 * Anything wrapped inside will be affected by the transition.
 *
 * It is currently using useSpring but ideally we will be able to switch
 * to whatever react-spring hook a user desires!
 */

const SlideElementWrapper = ({ elementNum, transitionEffect, children }) => {
  const [state] = React.useContext(SlideContext);

  const [styleProps, set] = useSpring(() => transitionEffect.from);

  React.useEffect(() => {
    if (state && elementNum <= state.currentSlideElement) {
      set({ from: transitionEffect.from, to: transitionEffect.to });
    }
  }, [state]);

  return <animated.div style={styleProps}>{children}</animated.div>;
};

SlideElementWrapper.propTypes = {
  transitionEffect: PropTypes.shape({
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired
  }),
  elementNum: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired
};

SlideElementWrapper.defaultProps = {
  transitionEffect: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  }
};

export default SlideElementWrapper;
