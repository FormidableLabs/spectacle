import * as React from 'react';

export const Appear: React.FC<{
  id?: string | number;
  priority?: number;
  /** @deprecated use priority prop instead */
  stepIndex?: number;
  children: React.ReactNode;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
  activeStyle?: unknown;
  inactiveStyle?: unknown;
}>;

type StepperProps<T extends unknown[] = unknown[]> = {
  id?: string | number;
  priority?: number;
  /** @deprecated use priority prop instead */
  stepIndex?: number;
  render?: (
    value: T[number],
    step: number,
    isActive: boolean
  ) => React.ReactNode;
  children?: (
    value: T[number],
    step: number,
    isActive: boolean
  ) => React.ReactNode;
  className?: string;
  tagName?: keyof JSX.IntrinsicElements;
  values: T;
  alwaysVisible?: boolean;
  activeStyle?: unknown;
  inactiveStyle?: unknown;
};

export const Stepper: React.FC<StepperProps>;
