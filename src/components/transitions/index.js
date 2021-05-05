const STAGE_RIGHT = 'translateX(-100%)';
const CENTER_STAGE = 'translateX(0%)';
const STAGE_LEFT = 'translateX(100%)';

export const fadeTransition = {
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

export const slideTransition = {
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
