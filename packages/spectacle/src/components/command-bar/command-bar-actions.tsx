import { useCallback, useRef } from 'react';
import { modeKeyForSearchParam, modeSearchParamForKey } from '../deck/modes';
import { parse as parseQS, stringify as stringifyQS } from 'query-string';
import { SpectacleMode, SPECTACLE_MODES } from '../../utils/constants';

const useCommandBarActions = () => {
  const mode = useRef(
    modeKeyForSearchParam(
      parseQS(location.search, {
        parseBooleans: true
      })
    )
  );

  const toggleMode = useCallback(
    (newMode: SpectacleMode, senderSlideIndex?: number) => {
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

  // TODO: KBar shortcuts don't work with 'mod', 'shift', or 'opt' keys
  // If we want to keep the og shortcut for these modes then remove these
  // shortcuts
  return [
    {
      id: 'Presenter Mode',
      name: 'Presenter Mode',
      shortcut: ['p'],
      keywords: 'presenter',
      perform: () => toggleMode(SPECTACLE_MODES.PRESENTER_MODE),
      section: 'Mode'
    },
    {
      id: 'Overview Mode',
      name: 'Overview Mode',
      shortcut: ['o'],
      keywords: 'overview',
      perform: () => toggleMode(SPECTACLE_MODES.OVERVIEW_MODE),
      section: 'Mode'
    },
    {
      id: 'Print Mode',
      name: 'Print Mode',
      shortcut: ['r'],
      keywords: 'export',
      perform: () => toggleMode(SPECTACLE_MODES.PRINT_MODE),
      section: 'Mode'
    },
    {
      id: 'Export Mode',
      name: 'Export Mode',
      shortcut: ['e'],
      keywords: 'export',
      perform: () => toggleMode(SPECTACLE_MODES.EXPORT_MODE),
      section: 'Mode'
    }
  ];
};

export default useCommandBarActions;
