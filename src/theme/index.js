import defaultTheme from './default-theme';
// TODO: replace with userTheme import alias?
// https://github.com/FormidableLabs/spectacle/issues/737
let userTheme = window.userTheme || {};

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
