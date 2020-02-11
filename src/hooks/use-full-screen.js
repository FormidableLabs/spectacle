import React from 'react';

export const useToggleFullScreen = () =>
  React.useCallback(() => {
    if (!document.fullscreenElement) {
      if ('requestFullScreen' in document.documentElement) {
        document.documentElement.requestFullscreen();
      } else if ('mozRequestFullScreen' in document.documentElement) {
        if (document.mozFullScreen) {
          document.mozCancelFullScreen();
          return;
        }
        document.documentElement.mozRequestFullScreen();
      } else if ('webkitRequestFullscreen' in document.documentElement) {
        if (document.webkitIsFullScreen) {
          document.webkitCancelFullScreen();
          return;
        }
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if ('exitFullscreen' in document) {
        document.exitFullscreen();
      }
    }
  }, []);
