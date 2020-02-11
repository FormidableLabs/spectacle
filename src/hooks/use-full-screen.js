import React from 'react';

export const useToggleFullScreen = () =>
  React.useCallback(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
    if ('requestFullscreen' in document.documentElement) {
      // Chrome/FF
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    } else if ('webkitRequestFullScreen' in document.documentElement) {
      // Safari still doesn't support standard.
      if (!document.webkitIsFullScreen) {
        document.documentElement.webkitRequestFullScreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }, []);
