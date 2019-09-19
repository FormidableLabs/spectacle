import defaultTheme from './default-theme';
let userTheme;
try {
  // see cli actions.js to understand this import
  // if the user doesn't specify a theme, this require will throw
  userTheme = require('spectacle-user-theme').default;
} catch (e) {
  userTheme = {};
}

const mergedTheme = { ...defaultTheme };
if (userTheme && Object.keys(userTheme).length > 0) {
  for (const key in defaultTheme) {
    const userThemeCategory = userTheme[key];
    const defaultThemeCategory = defaultTheme[key];
    if (userThemeCategory) {
      mergedTheme[key] = { ...defaultThemeCategory, ...userThemeCategory };
    }
  }
}

export default mergedTheme;
