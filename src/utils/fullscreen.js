export const requestFullscreen = (element = document.documentElement) => {
  const request =
    element.requestFullscreen ||
    element.webkitRequestFullscreen ||
    element.mozRequestFullScreen ||
    element.mozRequestFullScreen;

  if (typeof request === 'function') {
    request.call(element);
  }
};

export const exitFullscreen = () => {
  const exit =
    document.exitFullscreen ||
    document.msExitFullscreen ||
    document.mozCancelFullScreen ||
    document.webkitExitFullscreen;

  if (typeof exit === 'function') {
    exit.call(document);
  }
};

export const getFullscreenElement = () =>
  document.fullscreenElement ||
  document.mozFullScreenElement ||
  document.webkitFullscreenElement ||
  document.msFullscreenElement;

export const isFullscreen = () => !!getFullscreenElement();

export const toggleFullscreen = () => {
  if (isFullscreen()) {
    exitFullscreen();
  } else {
    requestFullscreen(document.documentElement);
  }
};
