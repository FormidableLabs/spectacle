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
