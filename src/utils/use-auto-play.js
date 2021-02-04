import { useEffect, useRef } from 'react';
import * as React from 'react';

export const useAutoPlay = options => {
  const {
    enabled = false,
    loop = false,
    navigation,
    interval = 1000
  } = options;

  const savedCallback = useRef(() => {
    if (navigation.isFinalSlide && loop) {
      navigation.skipTo({ slideIndex: 0, stepIndex: 0 });
    } else {
      navigation.stepForward();
    }
  });

  useEffect(() => {
    if (enabled) {
      const id = setInterval(savedCallback.current, interval);
      return () => clearInterval(id);
    }
  }, [enabled, interval]);
};
