import { useRef, useState, useCallback, useEffect } from 'react';
import useResizeObserver from 'use-resize-observer';
import { CSSObject } from 'styled-components';

type ResizeHandler = NonNullable<
  NonNullable<Parameters<typeof useResizeObserver>[0]>['onResize']
>;

// Returns an offset and scaling factor which, when applied to `element`, will
// make it properly fit into `container` at the given aspect ratio.
export default function useAspectRatioFitting({
  targetWidth = 1366,
  targetHeight = 768
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState({ x: 0, y: 0 });

  const recalculate = useCallback<ResizeHandler>(
    ({ width, height }) => {
      const containerWidth = Number(width) || 0.01;
      const containerHeight = Number(height) || 0.01;

      const containerRatio = containerWidth / containerHeight;
      const targetRatio = targetWidth / targetHeight;
      const useVertical = containerRatio > targetRatio;

      const scaleFactor = useVertical
        ? containerHeight / targetHeight
        : containerWidth / targetWidth;

      const scaledWidth = targetWidth * scaleFactor;
      const scaledHeight = targetHeight * scaleFactor;

      let x0 = 0;
      if (useVertical) {
        x0 = 0.5 * (containerWidth - scaledWidth);
        x0 /= 1 - scaleFactor;
      }

      let y0 = 0;
      if (!useVertical) {
        y0 = 0.5 * (containerHeight - scaledHeight);
        y0 /= 1 - scaleFactor;
      }

      setScaleFactor(scaleFactor);
      setTransformOrigin({ x: x0, y: y0 });
    },
    [targetWidth, targetHeight]
  );

  // recalculate sizes on the initial pass, and each time the target size
  // changes. (our measurements aren't as accurate as `useResizeObserver`, but
  // we only need to get them close because it'll do them again anyways.)
  useEffect(() => {
    if (!containerRef || !containerRef.current) return;
    const rects = containerRef.current.getClientRects();
    recalculate(rects[0]);
  }, [targetWidth, targetHeight, recalculate]);

  useResizeObserver({
    ref: containerRef,
    onResize: recalculate
  });

  const styles: CSSObject = {
    position: 'relative',
    width: targetWidth,
    height: targetHeight,
    scaleFactor,
    transform: `scale(${scaleFactor})`,
    transformOrigin: `${transformOrigin.x}px ${transformOrigin.y}px`
  };

  return [containerRef, styles] as const;
}
