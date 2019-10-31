import defaultTheme from './default-theme';
import printTheme from './print-theme';

const mergeKeys = (base, override) =>
  Object.keys(override || {}).reduce(
    (merged, key) => {
      merged[key] = { ...merged[key], ...override[key] };
      return merged;
    },
    { ...base }
  );

export const mergeTheme = theme => {
  const isPrintMode = window.location.search.includes('printMode');
  const merged = mergeKeys(defaultTheme, theme);

  // if is print mode then do the above for printTheme else return the
  // above merged themes
  return isPrintMode ? mergeKeys(merged, printTheme) : merged;
};
