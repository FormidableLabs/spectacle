const STAGE_RIGHT = 'translateX(-100%)';
const CENTER_STAGE = 'translateX(0%)';
const STAGE_LEFT = 'translateX(100%)';

type SlideStyle = {
  [key in keyof CSSStyleDeclaration]?: string | number;
};

export type SlideTransition = {
  from?: SlideStyle;
  leave?: SlideStyle;
  enter?: SlideStyle;
};

export const fadeTransition: SlideTransition = {
  from: {
    opacity: 0
  },
  enter: {
    opacity: 1
  },
  leave: {
    opacity: 0
  }
};

export const slideTransition: SlideTransition = {
  from: {
    transform: STAGE_LEFT
  },
  enter: {
    transform: CENTER_STAGE
  },
  leave: {
    transform: STAGE_RIGHT
  }
};

export const defaultTransition = slideTransition;
