export function overviewFrameStyle({
  overviewScale,
  nativeSlideWidth,
  nativeSlideHeight
}) {
  return {
    margin: '1rem',
    width: `${overviewScale * nativeSlideWidth}px`,
    height: `${(overviewScale / (nativeSlideWidth / nativeSlideHeight)) *
      nativeSlideWidth}px`,
    display: 'block',
    transform: 'none',
    position: 'relative'
  };
}

export function overviewWrapperStyle({ overviewScale }) {
  return {
    width: `${100 / overviewScale}%`,
    height: `${100 / overviewScale}%`,
    transform: `scale(${overviewScale})`,
    transformOrigin: '0px 0px',
    position: 'absolute'
  };
}

export function printFrameStyle({ scaleFactor, height, width }) {
  return {
    margin: 20,
    width: `${scaleFactor * width}px`,
    height: `${(scaleFactor / (width / height)) * width}px`,
    display: 'block',
    transform: 'none',
    position: 'relative'
  };
}

export function printWrapperStyle({ scaleFactor }) {
  return {
    width: `${100 / scaleFactor}%`,
    height: `${100 / scaleFactor}%`,
    transform: `scale(${scaleFactor})`,
    transformOrigin: '0px 0px',
    position: 'absolute'
  };
}
