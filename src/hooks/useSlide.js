import React from 'react';

/**
 *
 */

export const SlideContext = React.createContext();

function useSlide(initialState, isActive, slideElementsLenght) {
  console.log('a');
  function reducer(state, action) {
    switch (action.type) {
      case 'next slide element':
        return (
          console.log('b') || {
            currentSlideElement: state.currentSlideElement + 1
          }
        );
      case 'prev slide element':
        return { currentSlideElement: state.currentSlideElement - 1 };
      default:
        return { ...state };
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleKeyDown = e => {
    if (e.key === 'ArrowLeft') {
      dispatch('next slide element');
    }
    if (e.key === 'ArrowRight') {
      dispatch('prev slide element');
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', e => handleKeyDown(e));
    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown());
    };
  }, [isActive]);
  return [state, dispatch];
}

export default useSlide;
