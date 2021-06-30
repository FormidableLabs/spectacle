import * as React from 'react';
import PropTypes from 'prop-types';

import { animated, useSpring } from 'react-spring';
import { useSteps } from '../hooks/use-steps';
import { SlideContext } from './slide/slide';

function SteppedComponent({
  id,
  className,
  children: childrenOrRenderFunction,
  tagName = 'div',
  priority,
  numSteps = 1,
  alwaysAppearActive = false,
  activeStyle = { opacity: '1' },
  inactiveStyle = { opacity: '0' }
}) {
  const { immediate } = React.useContext(SlideContext);

  const { isActive, step, placeholder } = useSteps(numSteps, { id, priority });

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
      <AnimatedEl
        style={alwaysAppearActive ? activeStyle : springStyle}
        className={className}
      >
        {children}
      </AnimatedEl>
    </>
  );
}

SteppedComponent.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  tagName: PropTypes.string,
  priority: PropTypes.number,
  numSteps: PropTypes.number,
  alwaysAppearActive: PropTypes.bool,
  activeStyle: PropTypes.object,
  inactiveStyle: PropTypes.object
};

export function Appear({ children, ...restProps }) {
  return (
    <SteppedComponent {...restProps} numSteps={1}>
      {children}
    </SteppedComponent>
  );
}

Appear.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  priority: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  className: PropTypes.string,
  tagName: PropTypes.string,
  activeStyle: PropTypes.object,
  inactiveStyle: PropTypes.object
};

export function Stepper({
  values,
  render: renderFn,
  children: renderChildrenFn,
  alwaysVisible = false,
  activeStyle,
  inactiveStyle,
  ...restProps
}) {
  console.log(renderFn);
  console.log(renderChildrenFn);

  if (renderFn !== undefined && renderChildrenFn !== undefined) {
    throw new Error(
      '<Stepper> component specified both `render` prop and a render function as its `children`.'
    );
  }


  return (
    <SteppedComponent
      {...restProps}
      numSteps={values.length}
      alwaysAppearActive={alwaysVisible}
    >
      {(step, isActive) =>
        (renderFn || renderChildrenFn)(values[step], step, isActive)
      }
    </SteppedComponent>
  );
}

Stepper.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  priority: PropTypes.number,

  render: PropTypes.func,
  children: PropTypes.func,

  className: PropTypes.string,
  tagName: PropTypes.string,

  values: PropTypes.arrayOf(PropTypes.any).isRequired,

  alwaysVisible: PropTypes.bool,
  activeStyle: PropTypes.object,
  inactiveStyle: PropTypes.object
};
