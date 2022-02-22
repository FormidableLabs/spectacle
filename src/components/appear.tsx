import { ReactNode, useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import { useSteps } from '../hooks/use-steps';
import { SlideContext } from './slide/slide';

const SteppedComponent = (props: SteppedComponentProps): JSX.Element => {
  const {
    id,
    className,
    children: childrenOrRenderFunction,
    tagName = 'div',
    priority,
    stepIndex,
    numSteps = 1,
    alwaysAppearActive = false,
    activeStyle = { opacity: '1' },
    inactiveStyle = { opacity: '0' }
  } = props;
  const { immediate } = useContext(SlideContext);

  const { isActive, step, placeholder } = useSteps(numSteps, {
    id,
    priority,
    stepIndex
  });

  const AnimatedEl = animated[tagName];

  let children: ReactNode;
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
};

type SteppedComponentProps = {
  id?: string | number;
  priority?: number;
  /** @deprecated use priority prop instead */
  stepIndex?: number;
  children: ReactNode | ((step: number, isActive: boolean) => ReactNode);
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
  activeStyle?: Partial<CSSStyleDeclaration>;
  inactiveStyle?: Partial<CSSStyleDeclaration>;
  numSteps?: number;
  alwaysAppearActive?: boolean;
};

type AppearProps = Omit<
  SteppedComponentProps,
  'numSteps' | 'alwaysAppearActive'
>;
export const Appear = (props: AppearProps): JSX.Element => {
  const { children, ...restProps } = props;
  return (
    <SteppedComponent {...restProps} numSteps={1}>
      {children}
    </SteppedComponent>
  );
};

export const Stepper = (props: StepperProps): JSX.Element => {
  const {
    values,
    render: renderFn,
    children: renderChildrenFn,
    alwaysVisible = false,
    activeStyle,
    inactiveStyle,
    ...restProps
  } = props;
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
        (renderFn || renderChildrenFn!)(values[step], step, isActive)
      }
    </SteppedComponent>
  );
};

type StepperProps<T extends unknown[] = unknown[]> = {
  id?: string | number;
  priority?: number;
  /** @deprecated use priority prop instead */
  stepIndex?: number;
  render?: (value: T[number], step: number, isActive: boolean) => ReactNode;
  children?: (value: T[number], step: number, isActive: boolean) => ReactNode;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
  values: T;
  alwaysVisible?: boolean;
  activeStyle?: Partial<CSSStyleDeclaration>;
  inactiveStyle?: Partial<CSSStyleDeclaration>;
};
