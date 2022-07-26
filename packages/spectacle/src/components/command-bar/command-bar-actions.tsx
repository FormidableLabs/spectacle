import { KEYBOARD_SHORTCUTS, SPECTACLE_MODES } from '../../utils/constants';
import useModes from '../../hooks/use-modes';
import { ActionImpl } from 'kbar';

const useCommandBarActions = () => {
  const { toggleMode } = useModes();

  return [
    {
      id: SPECTACLE_MODES.PRESENTER_MODE,
      name: 'Presenter Mode',
      keywords: 'presenter',
      internal_shortcut: KEYBOARD_SHORTCUTS.PRESENTER_MODE.split('+'),
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.PRESENTER_MODE }),
      section: 'Mode'
    },
    {
      id: SPECTACLE_MODES.OVERVIEW_MODE,
      name: 'Overview Mode',
      keywords: 'overview',
      internal_shortcut: KEYBOARD_SHORTCUTS.OVERVIEW_MODE.split('+'),
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.OVERVIEW_MODE }),
      section: 'Mode'
    },
    {
      id: SPECTACLE_MODES.PRINT_MODE,
      name: 'Print Mode',
      keywords: 'export',
      internal_shortcut: KEYBOARD_SHORTCUTS.PRINT_MODE.split('+'),
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.PRINT_MODE }),
      section: 'Mode'
    },
    {
      id: SPECTACLE_MODES.EXPORT_MODE,
      name: 'Export Mode',
      keywords: 'export',
      internal_shortcut: KEYBOARD_SHORTCUTS.EXPORT_MODE.split('+'),
      perform: () => toggleMode({ newMode: SPECTACLE_MODES.EXPORT_MODE }),
      section: 'Mode'
    }
  ];
};

export type InternalCommand = ActionImpl & {
  internal_shortcut?: string[];
};

export default useCommandBarActions;
