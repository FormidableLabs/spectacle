import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { parse as parseQS } from 'query-string';
import DefaultDeck from './default-deck';
import PresenterMode from '../presenter-mode';
import useMousetrap from '../../hooks/use-mousetrap';
import { KEYBOARD_SHORTCUTS, SPECTACLE_MODES } from '../../utils/constants';

export default function SpectacleDeck(props) {
  const { search: queryString } = location;
  const { presenterMode, overviewMode } = parseQS(queryString, {
    parseBooleans: true
  });

  const defaultMode = useMemo(() => {
    if (presenterMode) {
      return SPECTACLE_MODES.PRESENTER_MODE;
    } else if (overviewMode) {
      return SPECTACLE_MODES.OVERVIEW_MODE;
    }
    return SPECTACLE_MODES.DEFAULT_MODE;
  }, [overviewMode, presenterMode]);

  const [mode, setMode] = useState(defaultMode);

  const toggleMode = useCallback(
    (e, newMode) => {
      e?.preventDefault();
      if (mode === newMode) {
        setMode(SPECTACLE_MODES.DEFAULT_MODE);
        return;
      }
      setMode(newMode);
    },
    [mode]
  );

  useMousetrap(
    {
      [KEYBOARD_SHORTCUTS.PRESENTER_MODE]: e =>
        toggleMode(e, SPECTACLE_MODES.PRESENTER_MODE),
      [KEYBOARD_SHORTCUTS.OVERVIEW_MODE]: e =>
        toggleMode(e, SPECTACLE_MODES.OVERVIEW_MODE)
    },
    []
  );

  switch (mode) {
    case SPECTACLE_MODES.DEFAULT_MODE:
      return <DefaultDeck {...props} />;

    case SPECTACLE_MODES.PRESENTER_MODE:
      return <PresenterMode {...props} />;

    case SPECTACLE_MODES.OVERVIEW_MODE:
      return <DefaultDeck overviewMode {...props} />;

    default:
      return null;
  }
}

SpectacleDeck.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object
};
