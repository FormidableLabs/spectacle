// Our default effect for transitioning between slides
const defaultTransitionEffect = {
  from: {
    position: 'absolute',
    transform: 'translate(100%, 0%)'
  },
  enter: {
    position: 'absolute',
    transform: 'translate(0, 0%)'
  },
  leave: {
    position: 'absolute',
    transform: 'translate(-100%, 0%)'
  },
  config: { precision: 0 }
};

export default defaultTransitionEffect;
