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
  visibleStyle = { opacity: '1' },
  invisibleStyle = { opacity: '0' }
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
    to: isActive ? visibleStyle : invisibleStyle,
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
  visibleStyle: PropTypes.object,
  invisibleStyle: PropTypes.object
};
