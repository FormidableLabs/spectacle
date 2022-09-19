const darkTheme = require('prism-react-renderer/themes/dracula/index.cjs.js');

module.exports = {
  ...darkTheme,
  plain: {
    backgroundColor: 'var(--oss-color-grey-darkest)'
  },
  styles: [
    ...darkTheme.styles,
    {
      types: ['function'],
      style: {
        color: 'var(--oss-color-primary-dark)'
      }
    }
  ]
};
