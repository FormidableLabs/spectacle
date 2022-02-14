import React, { useCallback, useRef } from 'react';
import { parse as parseQS, stringify as stringifyQS } from 'query-string';
import DefaultDeck from './default-deck';
import PresenterMode from '../presenter-mode';
import PrintMode from '../print-mode';
import useMousetrap from '../../hooks/use-mousetrap';
import {
  KEYBOARD_SHORTCUTS,
  SPECTACLE_MODES,
  SpectacleMode
} from '../../utils/constants';
import { modeKeyForSearchParam, modeSearchParamForKey } from './modes';
import { DeckProps } from './deck';

export default function SpectacleDeck(props: DeckProps) {
  const mode = useRef(
    modeKeyForSearchParam(
      parseQS(location.search, {
        parseBooleans: true
      })
    )
  );

  const toggleMode = useCallback(
    (e, newMode: SpectacleMode, senderSlideIndex?: number) => {
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

  useMousetrap(
    {
      [KEYBOARD_SHORTCUTS.PRESENTER_MODE]: (e) =>
        toggleMode(e, SPECTACLE_MODES.PRESENTER_MODE),
      [KEYBOARD_SHORTCUTS.PRINT_MODE]: (e) =>
        toggleMode(e, SPECTACLE_MODES.PRINT_MODE),
      [KEYBOARD_SHORTCUTS.EXPORT_MODE]: (e) =>
        toggleMode(e, SPECTACLE_MODES.EXPORT_MODE),
      [KEYBOARD_SHORTCUTS.OVERVIEW_MODE]: (e) =>
        toggleMode(e, SPECTACLE_MODES.OVERVIEW_MODE)
    },
    []
  );

  switch (mode.current) {
    case SPECTACLE_MODES.DEFAULT_MODE:
      return <DefaultDeck {...props} toggleMode={toggleMode} />;

    case SPECTACLE_MODES.PRESENTER_MODE:
      return <PresenterMode {...props} />;

    /**
     * Print mode and export mode are identical except for the theme
     * that is used. Print mode uses the print theme which is usually
     * monotone and export mode uses the default theme.
     */
    case SPECTACLE_MODES.PRINT_MODE:
      return <PrintMode {...props} />;

    case SPECTACLE_MODES.EXPORT_MODE:
      return <PrintMode {...props} exportMode />;

    case SPECTACLE_MODES.OVERVIEW_MODE:
      return <DefaultDeck overviewMode toggleMode={toggleMode} {...props} />;

    default:
      return null;
  }
}
