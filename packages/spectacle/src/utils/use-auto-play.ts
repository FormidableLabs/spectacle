import { useEffect, useRef } from 'react';
import { DeckStateAndActions } from '../hooks/use-deck-state';

export type AutoPlayOptions = {
  enabled?: boolean;
  loop?: boolean;
  stepForward: DeckStateAndActions['stepForward'];
  interval?: number;
};

export const useAutoPlay = ({
  enabled = false,
  loop = false,
  stepForward,
  interval = 1000
}: AutoPlayOptions) => {
  const stepFn = useRef(stepForward);
  stepFn.current = stepForward;

  useEffect(() => {
    if (enabled) {
      const id = setInterval(() => {
        stepFn.current();
      }, interval);

      return () => clearInterval(id);
    }
  }, [enabled, interval, loop]);
};
