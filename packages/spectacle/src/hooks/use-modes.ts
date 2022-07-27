import { useCallback, useRef } from 'react';
import { parse as parseQS, stringify as stringifyQS } from 'query-string';
import {
  SPECTACLE_MODES,
  SpectacleMode,
  ToggleModeParams,
  ModeSearchParams
} from '../utils/constants';

const useModes = (): ModeActions => {
  const mode = useRef(
    modeKeyForSearchParam(
      parseQS(location.search, {
        parseBooleans: true
      })
    )
  );

  const toggleMode = useCallback(
    (args: ToggleModeParams) => {
      const { newMode, senderSlideIndex, e } = args;
      e?.preventDefault();

      let stepIndex: string | number = 0;
      let slideIndex: string | number = senderSlideIndex || '';
      const searchParams = parseQS(location.search, {
        parseBooleans: true
      });

      if (!slideIndex) {
        slideIndex = searchParams.slideIndex as string;
        stepIndex = searchParams.stepIndex as string;
      }

      if (mode.current === newMode) {
        location.search = stringifyQS({
          slideIndex,
          stepIndex
        });
        return;
      }

      mode.current = newMode;

      location.search = stringifyQS({
        slideIndex,
        stepIndex,
        ...modeSearchParamForKey(newMode)
      });
    },
    [mode]
  );

  const getCurrentMode = useCallback((): SpectacleMode => mode.current, []);

  return { toggleMode, getCurrentMode };
};

function modeSearchParamForKey(key: SpectacleMode): ModeSearchParams {
  if (key === SPECTACLE_MODES.PRESENTER_MODE) {
    return { presenterMode: true };
  } else if (key === SPECTACLE_MODES.OVERVIEW_MODE) {
    return { overviewMode: true };
  } else if (key === SPECTACLE_MODES.PRINT_MODE) {
    return { printMode: true };
  } else if (key === SPECTACLE_MODES.EXPORT_MODE) {
    return { exportMode: true };
  }
  return {};
}

function modeKeyForSearchParam({
  presenterMode,
  overviewMode,
  printMode,
  exportMode
}: ModeSearchParams) {
  if (presenterMode) {
    return SPECTACLE_MODES.PRESENTER_MODE;
  } else if (overviewMode) {
    return SPECTACLE_MODES.OVERVIEW_MODE;
  } else if (printMode) {
    return SPECTACLE_MODES.PRINT_MODE;
  } else if (exportMode) {
    return SPECTACLE_MODES.EXPORT_MODE;
  }
  return SPECTACLE_MODES.DEFAULT_MODE;
}

export type ModeActions = {
  toggleMode: (args: ToggleModeParams) => void;
  getCurrentMode: () => SpectacleMode;
};

export default useModes;
