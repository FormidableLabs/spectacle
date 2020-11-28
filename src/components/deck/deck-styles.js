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

export function printFrameStyle({
  nativeSlideWidth,
  nativeSlideHeight,
  printScale
}) {
  return {
    margin: 0,
    width: `${printScale * nativeSlideWidth}px`,
    height: `${(printScale / (nativeSlideWidth / nativeSlideHeight)) *
      nativeSlideWidth}px`,
    display: 'block',
    transform: 'none',
    position: 'relative',
    breakAfter: 'page'
  };
}

export function printWrapperStyle({ printScale }) {
  return {
    width: `${100 / printScale}%`,
    height: `${100 / printScale}%`,
    transform: `scale(${printScale})`,
    transformOrigin: '0px 0px',
    position: 'absolute'
  };
}
