import { Fragment } from 'react';
import DefaultDeck from './default-deck';
import PresenterMode from '../presenter-mode';
import PrintMode from '../print-mode';
import useMousetrap from '../../hooks/use-mousetrap';
import { KEYBOARD_SHORTCUTS, SPECTACLE_MODES } from '../../utils/constants';
import { DeckProps } from './deck';
import useModes, { ModeActions } from '../../hooks/use-modes';
import CommandBar from '../command-bar';

const View = ({
  getCurrentMode,
  toggleMode,
  ...props
}: ModeActions & DeckProps) => {
  const mode = getCurrentMode();
  switch (mode) {
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
      return <Fragment />;
  }
};

const SpectacleDeck = (props: DeckProps): JSX.Element => {
  const { toggleMode, getCurrentMode } = useModes();

  useMousetrap(
    {
      [KEYBOARD_SHORTCUTS.PRESENTER_MODE]: (e) =>
        e && toggleMode({ e, newMode: SPECTACLE_MODES.PRESENTER_MODE }),
      [KEYBOARD_SHORTCUTS.PRINT_MODE]: (e) =>
        e && toggleMode({ e, newMode: SPECTACLE_MODES.PRINT_MODE }),
      [KEYBOARD_SHORTCUTS.EXPORT_MODE]: (e) =>
        e && toggleMode({ e, newMode: SPECTACLE_MODES.EXPORT_MODE }),
      [KEYBOARD_SHORTCUTS.OVERVIEW_MODE]: (e) =>
        e && toggleMode({ e, newMode: SPECTACLE_MODES.OVERVIEW_MODE })
    },
    []
  );

  return (
    <CommandBar>
      <View
        getCurrentMode={getCurrentMode}
        toggleMode={toggleMode}
        {...props}
      />
    </CommandBar>
  );
};

export default SpectacleDeck;
