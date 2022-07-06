import { SPECTACLE_MODES, SpectacleMode } from '../../utils/constants';

type ModeSearchParams = {
  presenterMode?: boolean;
  overviewMode?: boolean;
  printMode?: boolean;
  exportMode?: boolean;
};

export function modeSearchParamForKey(key: SpectacleMode): ModeSearchParams {
  if (key === SPECTACLE_MODES.PRESENTER_MODE) {
    return { presenterMode: true };
  } else if (key === SPECTACLE_MODES.OVERVIEW_MODE) {
    return { overviewMode: true };
  } else if (key === SPECTACLE_MODES.PRINT_MODE) {
    return { printMode: true };
  } else if (key === SPECTACLE_MODES.EXPORT_MODE) {
    return { exportMode: true };
  }
  return {};
}

export function modeKeyForSearchParam({
  presenterMode,
  overviewMode,
  printMode,
  exportMode
}: ModeSearchParams) {
  if (presenterMode) {
    return SPECTACLE_MODES.PRESENTER_MODE;
  } else if (overviewMode) {
    return SPECTACLE_MODES.OVERVIEW_MODE;
  } else if (printMode) {
    return SPECTACLE_MODES.PRINT_MODE;
  } else if (exportMode) {
    return SPECTACLE_MODES.EXPORT_MODE;
  }
  return SPECTACLE_MODES.DEFAULT_MODE;
}
