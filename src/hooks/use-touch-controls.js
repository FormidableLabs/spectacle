import React from 'react';

/**
 * Hook that navigates to next or previous slide when the user swipes
 * left or right in a touch device, where there is no keyboard.
 */
const useTouchControls = ({ navigateToNext, navigateToPrevious }) => {
  const touchId = React.useRef(null); // To keep track of which touch started the swipe.
  const startTouchX = React.useRef(0); // Where the swipe started.

  const threshold = 100; // Pixels the user must drag to trigger a slide swipe.

  React.useEffect(() => {
    /**
     * Keep track of which touch even we're following.
     */
    function handleTouchStart(e) {
      if (touchId.current === null) {
        const touch = e.changedTouches[0];
        touchId.current = touch.identifier;
        startTouchX.current = touch.clientX;
      }
    }

    /**
     * Only care about the touch we're tracking.
     * See how much the user swiped, if it's more than
     * the threshold, navigate to the previous or next slide.
     */
    function handleTouchEnd(e) {
      const touchList = e.changedTouches;
      for (let i = 0; i < touchList.length; i++) {
        const touch = touchList[i];
        if (touch.identifier === touchId.current) {
          touchId.current = null;
          const distance = touch.clientX - startTouchX.current;
          if (distance > threshold) {
            navigateToPrevious();
          } else if (distance < -threshold) {
            navigateToNext();
          }
          break;
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigateToNext, navigateToPrevious]);
};

export default useTouchControls;
