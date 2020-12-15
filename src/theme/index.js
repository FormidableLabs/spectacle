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

export function mergeTheme({ theme, printMode }) {
  const merged = mergeKeys(defaultTheme, theme);
  return printMode ? mergeKeys(merged, printTheme) : merged;
}
