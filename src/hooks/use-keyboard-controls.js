import React from 'react';
import debounce from '../utils/debounce';

const useKeyboardControls = ({
  keyboardControls = 'arrows',
  navigateToNext,
  navigateToPrevious
}) => {
  const keyPressCount = React.useRef(0);
  React.useEffect(
    function() {
      // Keep track of the number of next slide presses for debounce
      // Create ref for debounceing function
      const debouncedDispatch = debounce(() => {
        const immediate = keyPressCount.current !== 1;
        navigateToNext({ immediate });
        keyPressCount.current = 0;
      }, 200);
      function handleKeyDown(e) {
        if (keyboardControls === 'arrows') {
          if (e.key === 'ArrowLeft') {
            navigateToPrevious();
          }
          if (e.key === 'ArrowRight') {
            keyPressCount.current++;
            debouncedDispatch();
          }
        }
        if (keyboardControls === 'space') {
          if (e.code === 'Space') {
            keyPressCount.current++;
            debouncedDispatch();
            e.preventDefault();
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [keyboardControls, navigateToNext, navigateToPrevious]
  );
};

export default useKeyboardControls;
