import { KEYBOARD_SHORTCUTS_IDS, SPECTACLE_MODES } from '../../utils/constants';
import useModes from '../../hooks/use-modes';

const useCommandBarActions = () => {
  const { toggleMode } = useModes();

  return [
    {
      id: KEYBOARD_SHORTCUTS_IDS.PRESENTER_MODE,
      name: 'Presenter Mode',
      keywords: 'presenter',
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.PRESENTER_MODE }),
      section: 'Mode'
    },
    {
      id: KEYBOARD_SHORTCUTS_IDS.OVERVIEW_MODE,
      name: 'Overview Mode',
      keywords: 'overview',
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.OVERVIEW_MODE }),
      section: 'Mode'
    },
    {
      id: KEYBOARD_SHORTCUTS_IDS.PRINT_MODE,
      name: 'Print Mode',
      keywords: 'export',
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.PRINT_MODE }),
      section: 'Mode'
    },
    {
      id: KEYBOARD_SHORTCUTS_IDS.EXPORT_MODE,
      name: 'Export Mode',
      keywords: 'export',
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.EXPORT_MODE }),
      section: 'Mode'
    }
  ];
};

export default useCommandBarActions;
