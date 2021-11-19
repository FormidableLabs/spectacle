import defaultTheme, { SpectacleThemeOverrides } from './default-theme';
import printTheme from './print-theme';

const mergeKeys = (base, override) =>
  Object.keys(override || {}).reduce(
    (merged, key) => {
      merged[key] = { ...merged[key], ...override[key] };
      return merged;
    },
    { ...base }
  );

type MergeOptions = { theme: SpectacleThemeOverrides; printMode?: boolean };

export function mergeTheme({ theme, printMode }: MergeOptions) {
  const merged = mergeKeys(defaultTheme, theme);
  return printMode ? mergeKeys(merged, printTheme) : merged;
}
