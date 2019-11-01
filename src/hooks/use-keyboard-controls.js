import React from 'react';
import debounce from '../utils/debounce';
import { useToggleFullScreen } from './use-full-screen';

const useKeyboardControls = ({
  keyboardControls = 'arrows',
  navigateToNext,
  navigateToPrevious,
  toggleMode
}) => {
  const keyPressCount = React.useRef(0);
  const toggleFullScreen = useToggleFullScreen();
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
        if (!!e.altKey) {
          switch (e.key) {
            case 'ø':
              toggleMode('overviewMode');
              break;
            case 'π':
              toggleMode('presenterMode');
              break;
            case 'ƒ':
              toggleFullScreen();
              break;
            default:
              null;
          }
        }
      }

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [
      keyboardControls,
      navigateToNext,
      navigateToPrevious,
      toggleFullScreen,
      toggleMode
    ]
  );
};

export default useKeyboardControls;
