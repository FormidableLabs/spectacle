import * as React from 'react';
import PropTypes from 'prop-types';
import Deck from './deck';
import useMousetrap from '../../hooks/use-mousetrap';
import PresenterMode from '../presenter-mode';
import { KEYBOARD_SHORTCUTS, SPECTACLE_MODES } from '../../utils/constants';

export default function SpectacleDeck(props) {
  const [mode, setMode] = React.useState(SPECTACLE_MODES.DEFAULT_MODE);

  const togglePresenterMode = React.useCallback(
    e => {
      e.preventDefault();
      if (mode === SPECTACLE_MODES.PRESENTER_MODE) {
        setMode(SPECTACLE_MODES.DEFAULT_MODE);
        return;
      }
      setMode(SPECTACLE_MODES.PRESENTER_MODE);
    },
    [mode]
  );

  useMousetrap(
    {
      [KEYBOARD_SHORTCUTS.PRESENTER_MODE]: togglePresenterMode
    },
    []
  );

  switch (mode) {
    case SPECTACLE_MODES.DEFAULT_MODE:
      return <Deck {...props} />;

    case SPECTACLE_MODES.PRESENTER_MODE:
      return <PresenterMode {...props} />;

    default:
      return null;
  }
}

SpectacleDeck.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object
};
