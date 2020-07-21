import * as React from 'react';
import PropTypes from 'prop-types';

import { animated } from 'react-spring';
import { useAnimatedSteps } from '../hooks/use-steps';

export default function Appear({
  id,
  className,
  children: childrenOrRenderFunction,
  tagName = 'div',
  stepIndex,
  numSteps = 1
}) {
  if (numSteps !== 1 && typeof childrenOrRenderFunction !== 'function') {
    console.warn(
      'TransitionElement seems to have multiple steps for no reason?'
    );
  }

  const { transitions, isActive, step, placeholder } = useAnimatedSteps(
    numSteps,
    {
      id,
      stepIndex
    }
  );

  const AnimatedEl = animated[tagName];

  let children;
  if (typeof childrenOrRenderFunction === 'function') {
    children = childrenOrRenderFunction(step, isActive);
  } else {
    children = childrenOrRenderFunction;
  }

  return (
    <>
      {placeholder}
      {transitions.map(
        ({ item, props, key }) =>
          item && (
            <AnimatedEl key={key} style={props} className={className}>
              {children}
            </AnimatedEl>
          )
      )}
    </>
  );
}

Appear.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  tagName: PropTypes.string,
  stepIndex: PropTypes.number,
  numSteps: PropTypes.number
};
