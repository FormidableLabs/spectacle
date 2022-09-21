import { useEffect, useRef } from 'react';
import { DeckStateAndActions } from '../hooks/use-deck-state';

export type AutoPlayOptions = {
  enabled?: boolean;
  loop?: boolean;
  navigation: Pick<DeckStateAndActions, 'skipTo' | 'stepForward'> & {
    isFinalSlide: boolean;
  };
  interval?: number;
};

export const useAutoPlay = ({
  enabled = false,
  loop = false,
  navigation,
  interval = 1000
}: AutoPlayOptions) => {
  const navRef = useRef(navigation);
  navRef.current = navigation;

  useEffect(() => {
    if (enabled) {
      const id = setInterval(() => {
        if (navRef.current.isFinalSlide && loop) {
          navRef.current.skipTo({ slideIndex: 0, stepIndex: 0 });
        } else {
          navRef.current.stepForward();
        }
      }, interval);

      return () => clearInterval(id);
    }
  }, [enabled, interval, loop]);
};
