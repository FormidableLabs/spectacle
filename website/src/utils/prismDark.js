const { themes } = require('prism-react-renderer');

module.exports = {
  ...themes.nightOwl,
  plain: {
    backgroundColor: 'var(--oss-color-grey-darkest)'
  },
  styles: [
    ...themes.nightOwl.styles,
    {
      types: ['function'],
      style: {
        color: 'var(--oss-color-primary-dark)'
      }
    }
  ]
};
