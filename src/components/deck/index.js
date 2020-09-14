import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import DefaultDeck from './default-deck';
import PresenterMode from '../presenter-mode';
import OverviewMode from '../overview-mode';
import useMousetrap from '../../hooks/use-mousetrap';
import { KEYBOARD_SHORTCUTS, SPECTACLE_MODES } from '../../utils/constants';

export default function SpectacleDeck(props) {
  const [mode, setMode] = useState(SPECTACLE_MODES.OVERVIEW_MODE);
  const [currentView, setCurrentView] = useState(null);

  const toggleMode = useCallback(
    (e, newMode, newView = null) => {
      e?.preventDefault();
      setCurrentView(newView);
      if (mode === newMode) {
        setMode(SPECTACLE_MODES.DEFAULT_MODE);
        return;
      }
      setMode(newMode);
    },
    [mode]
  );

  const handleOverviewSlideSelected = useCallback(
    newView => {
      toggleMode(null, SPECTACLE_MODES.DEFAULT_MODE, newView);
    },
    [toggleMode]
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
      return <DefaultDeck currentView={currentView} {...props} />;

    case SPECTACLE_MODES.PRESENTER_MODE:
      return <PresenterMode {...props} />;

    case SPECTACLE_MODES.OVERVIEW_MODE:
      return (
        <OverviewMode
          onSlideSelected={handleOverviewSlideSelected}
          {...props}
        />
      );

    default:
      return null;
  }
}

SpectacleDeck.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object
};
