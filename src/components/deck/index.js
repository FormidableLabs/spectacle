import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import DefaultDeck from './default-deck';
import PresenterMode from '../presenter-mode';
import useMousetrap from '../../hooks/use-mousetrap';
import { KEYBOARD_SHORTCUTS, SPECTACLE_MODES } from '../../utils/constants';

export default function SpectacleDeck(props) {
  const [mode, setMode] = useState(SPECTACLE_MODES.DEFAULT_MODE);

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
