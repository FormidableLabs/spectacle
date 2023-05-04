const { themes } = require('prism-react-renderer');

module.exports = {
  ...themes.nightOwlLight,
  styles: [
    ...themes.nightOwlLight.styles,
    {
      types: ['function'],
      style: {
        color: 'var(--oss-color-primary)'
      }
    }
  ]
};
