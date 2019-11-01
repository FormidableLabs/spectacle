import React from 'react';

export const useToggleFullScreen = () =>
  React.useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if ('exitFullscreen' in document) {
        document.exitFullscreen();
      }
    }
  }, []);
