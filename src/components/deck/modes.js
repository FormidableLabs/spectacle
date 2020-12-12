import { SPECTACLE_MODES } from '../../utils/constants';

export function modeSearchParamForKey(key) {
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
}) {
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
