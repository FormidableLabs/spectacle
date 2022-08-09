import darkTheme from 'prism-react-renderer/themes/dracula/index.cjs.js';

export default {
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
