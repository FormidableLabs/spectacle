import defaultTheme from './default-theme';

// A naive, but fast deep object copy.
const deepCopy = obj => JSON.parse(JSON.stringify(obj));

// Merge a user-provided theme in with defaults.
// **Note**: Assumes theme objects only go 2 levels deep.
export const mergeTheme = theme =>
  Object.keys(theme || {}).reduce((merged, key) => {
    merged[key] = { ...merged[key], ...theme[key] };
    return merged;
  }, deepCopy(defaultTheme));

export default defaultTheme;
