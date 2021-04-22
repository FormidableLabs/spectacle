import * as React from 'react';
import PropTypes from 'prop-types';

import { animated, useSpring } from 'react-spring';
import { useSteps } from '../hooks/use-steps';
import { SlideContext } from './slide/slide';

export default function Appear({
  id,
  className,
  children: childrenOrRenderFunction,
  tagName = 'div',
  stepIndex,
  activeStyle = { opacity: '1' },
  inactiveStyle = { opacity: '0' }
}) {
  const { immediate } = React.useContext(SlideContext);

  const { isActive, placeholder } = useSteps(1, { id, stepIndex });

  const AnimatedEl = animated[tagName];

  let children;
  if (typeof childrenOrRenderFunction === 'function') {
    children = childrenOrRenderFunction(step, isActive);
  } else {
    children = childrenOrRenderFunction;
  }

  const springStyle = useSpring({
    to: isActive ? activeStyle : inactiveStyle,
    immediate
  });

  return (
    <>
      {placeholder}
      <AnimatedEl style={springStyle} className={className}>
        {children}
      </AnimatedEl>
    </>
  );
}

Appear.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  tagName: PropTypes.string,
  stepIndex: PropTypes.number,
  numSteps: PropTypes.number,
  activeStyle: PropTypes.object,
  inactiveStyle: PropTypes.object
};
