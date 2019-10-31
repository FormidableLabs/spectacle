import defaultTheme from './default-theme';
import printTheme from './print-theme';

// Merge a user-provided theme in with defaults.
// **Note**: Assumes theme objects only go 2 levels deep.
export const mergeTheme = theme => {
  const isPrintMode = window.location.search.includes('printMode');
  const merged = Object.keys(theme || {}).reduce(
    (mergedTheme, key) => ({
      ...mergedTheme,
      [key]: {
        ...mergedTheme[key],
        ...theme[key]
      }
    }),
    defaultTheme
  );
  // if is print mode then do the above for printTheme else return the
  // above merged themes
  return isPrintMode
    ? Object.keys(printTheme || {}).reduce(
        (mergedTheme, key) => ({
          ...mergedTheme,
          [key]: {
            ...mergedTheme[key],
            ...printTheme[key]
          }
        }),
        merged
      )
    : merged;
};
export default defaultTheme;
