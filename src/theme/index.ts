import defaultTheme, {
  SpectacleTheme,
  SpectacleThemeOverrides
} from './default-theme';
import printTheme from './print-theme';

const mergeKeys = (
  base: SpectacleTheme,
  override: SpectacleThemeOverrides
): SpectacleTheme =>
  (Object.keys(override || {}) as Array<keyof SpectacleTheme>).reduce(
    (merged, key) => {
      merged[key] = { ...merged[key], ...override[key] } as any;
      return merged;
    },
    { ...base }
  );

type MergeOptions = { theme: SpectacleThemeOverrides; printMode?: boolean };

export function mergeTheme({ theme, printMode }: MergeOptions) {
  const merged = mergeKeys(defaultTheme, theme);
  return printMode ? mergeKeys(merged, printTheme) : merged;
}
