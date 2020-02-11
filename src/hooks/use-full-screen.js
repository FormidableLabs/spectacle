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
      // Safari still doesn't support standard.
    } else if ('webkitRequestFullscreen' in document.documentElement) {
      if (!document.webkitIsFullScreen) {
        document.documentElement.webkitRequestFullscreen();
      } else {
        document.webkitCancelFullScreen();
      }
    }
  }, []);
