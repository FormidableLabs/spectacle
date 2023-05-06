import {
  KEYBOARD_SHORTCUTS_IDS,
  SpectacleMode,
  SPECTACLE_MODES
} from '../../utils/constants';
import useModes from '../../hooks/use-modes';

/**
 * Kbar default actions, those that do not depend on dynamic logic, can be added here.
 * To register actions dynamically use 'useRegisterActions' and make sure the action
 * is registed within the KBarProvider.
 * @see https://kbar.vercel.app/docs/concepts/actions
 * Kbar action shortcuts dont seem to support all keybindings. If you need to utilize
 * keybindings that are not supported you'll have to implement the keybinding seperately.
 * @see useMousetrap
 * To display keybindings that are not supported in the Kbar results, please use
 * KEYBOARD_SHORTCUTS instead of Kbar actions 'shortcut' property.
 * @see CommandBarResults getShortcutKeys
 */

const spectacleModeDisplay = {
  [SPECTACLE_MODES.DEFAULT_MODE]: 'Default Mode',
  [SPECTACLE_MODES.PRESENTER_MODE]: 'Presenter Mode',
  [SPECTACLE_MODES.OVERVIEW_MODE]: 'Overview Mode',
  [SPECTACLE_MODES.PRINT_MODE]: 'Print Mode',
  [SPECTACLE_MODES.EXPORT_MODE]: 'Export Mode'
};

const getName = (currentMode: string, mode: SpectacleMode) => {
  const defaultMode = SPECTACLE_MODES.DEFAULT_MODE;
  return currentMode === mode
    ? `← Back to ${spectacleModeDisplay[defaultMode]}`
    : spectacleModeDisplay[mode];
};

const useCommandBarActions = () => {
  const { toggleMode, getCurrentMode } = useModes();
  const currentMode = getCurrentMode();
  return [
    {
      id: KEYBOARD_SHORTCUTS_IDS.PRESENTER_MODE,
      name: getName(currentMode, SPECTACLE_MODES.PRESENTER_MODE),
      keywords: 'presenter',
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.PRESENTER_MODE }),
      section: 'Mode'
    },
    {
      id: KEYBOARD_SHORTCUTS_IDS.OVERVIEW_MODE,
      name: getName(currentMode, SPECTACLE_MODES.OVERVIEW_MODE),
      keywords: 'overview',
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.OVERVIEW_MODE }),
      section: 'Mode'
    },
    {
      id: KEYBOARD_SHORTCUTS_IDS.PRINT_MODE,
      name: getName(currentMode, SPECTACLE_MODES.PRINT_MODE),
      keywords: 'export',
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.PRINT_MODE }),
      section: 'Mode'
    },
    {
      id: KEYBOARD_SHORTCUTS_IDS.EXPORT_MODE,
      name: getName(currentMode, SPECTACLE_MODES.EXPORT_MODE),
      keywords: 'export',
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.EXPORT_MODE }),
      section: 'Mode'
    }
  ];
};

export default useCommandBarActions;
