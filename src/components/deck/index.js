import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { parse as parseQS, stringify as stringifyQS } from 'query-string';
import DefaultDeck from './default-deck';
import PresenterMode from '../presenter-mode';
import PrintMode from '../print-mode';
import useMousetrap from '../../hooks/use-mousetrap';
import { KEYBOARD_SHORTCUTS, SPECTACLE_MODES } from '../../utils/constants';
import { modeKeyForSearchParam, modeSearchParamForKey } from './modes';

export default function SpectacleDeck(props) {
  const mode = useRef(
    modeKeyForSearchParam(
      parseQS(location.search, {
        parseBooleans: true
      })
    )
  );

  const toggleMode = useCallback(
    (e, newMode, senderSlideIndex) => {
      e?.preventDefault();

      let stepIndex = 0;
      let slideIndex = senderSlideIndex;
      const searchParams = parseQS(location.search, {
        parseBooleans: true
      });

      if (!slideIndex) {
        slideIndex = searchParams.slideIndex;
        stepIndex = searchParams.stepIndex;
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
      [KEYBOARD_SHORTCUTS.PRESENTER_MODE]: e =>
        toggleMode(e, SPECTACLE_MODES.PRESENTER_MODE),
      [KEYBOARD_SHORTCUTS.PRINT_MODE]: e =>
        toggleMode(e, SPECTACLE_MODES.PRINT_MODE),
      [KEYBOARD_SHORTCUTS.EXPORT_MODE]: e =>
        toggleMode(e, SPECTACLE_MODES.EXPORT_MODE),
      [KEYBOARD_SHORTCUTS.OVERVIEW_MODE]: e =>
        toggleMode(e, SPECTACLE_MODES.OVERVIEW_MODE)
    },
    []
  );

  switch (mode.current) {
    case SPECTACLE_MODES.DEFAULT_MODE:
      return <DefaultDeck {...props} />;

    case SPECTACLE_MODES.PRESENTER_MODE:
      return <PresenterMode {...props} />;

    /**
     * Print mode and export mode are identical except for the theme
     * that is used. Print mode uses the print theme which is usually
     * monotone and export mode uses the default theme.
     */
    case SPECTACLE_MODES.PRINT_MODE:
      return <PrintMode {...props} printMode />;

    case SPECTACLE_MODES.EXPORT_MODE:
      return <PrintMode {...props} exportMode />;

    case SPECTACLE_MODES.OVERVIEW_MODE:
      return <DefaultDeck overviewMode toggleMode={toggleMode} {...props} />;

    default:
      return null;
  }
}

SpectacleDeck.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object
};
