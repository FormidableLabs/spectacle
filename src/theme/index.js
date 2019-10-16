import defaultTheme from './default-theme';
// see cli actions.js to understand this import
let userTheme = require('spectacle-user-theme').default;

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
