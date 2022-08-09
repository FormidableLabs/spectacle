import lightTheme from 'prism-react-renderer/themes/github/index.cjs.js';

export default {
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
