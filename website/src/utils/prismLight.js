const lightTheme = require('prism-react-renderer/themes/github/index.cjs.js');

module.exports = {
  ...lightTheme,
  styles: [
    ...lightTheme.styles,
    {
      types: ['function'],
      style: {
        color: 'var(--oss-color-primary)'
      }
    }
  ]
};
