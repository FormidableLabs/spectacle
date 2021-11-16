export function overviewFrameStyle({
  overviewScale,
  nativeSlideWidth,
  nativeSlideHeight
}: {
  overviewScale: number;
  nativeSlideWidth: number;
  nativeSlideHeight: number;
}): Partial<CSSStyleDeclaration> {
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

export function overviewWrapperStyle({
  overviewScale
}: {
  overviewScale: number;
}): Partial<CSSStyleDeclaration> {
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
}: {
  nativeSlideWidth: number;
  nativeSlideHeight: number;
  printScale: number;
}): Partial<CSSStyleDeclaration> {
  return {
    margin: '0',
    width: `${printScale * nativeSlideWidth}px`,
    height: `${(printScale / (nativeSlideWidth / nativeSlideHeight)) *
      nativeSlideWidth}px`,
    display: 'block',
    transform: 'none',
    position: 'relative',
    breakAfter: 'page'
  };
}

export function printWrapperStyle({
  printScale
}: {
  printScale: number;
}): Partial<CSSStyleDeclaration> {
  return {
    width: `${100 / printScale}%`,
    height: `${100 / printScale}%`,
    transform: `scale(${printScale})`,
    transformOrigin: '0px 0px',
    position: 'absolute'
  };
}
