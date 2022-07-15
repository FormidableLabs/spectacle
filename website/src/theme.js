const borderRadius = 'var(--oss-border-radius)';

const colors = {
  bgColor: 'var(--oss-bg-color)',
  bgDark: 'var(--oss-bg-dark)',
  bgLight: 'var(--oss-bg-light)',
  text: 'var(--oss-text)',
  textDark: 'var(--oss-text-dark)',
  textLight: 'var(--oss-text-light)',
  button: 'var(--oss-button)',
  buttonHover: 'var(--oss-button-hover)',
  buttonLight: 'var(--oss-button-light)',
  buttonLightHover: 'var(--oss-button-light-hover)',
  link: 'var(--oss-link)',
  linkHover: 'var(--oss-link-hover)',
  inputBg: 'var(--oss-input-bg)'
};

const systemFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji'
];

const fonts = {
  body: systemFonts.join(', '),
  code: 'Space Mono, monospace'
};

const fontSizes = {
  small: '0.9em',
  body: '1.8rem',
  bodySmall: '1.5rem',
  code: '0.8em',
  h1: '5.8rem',
  h1Small: '4.5rem',
  h2: '3.2rem',
  h3: '2.2rem'
};

const fontWeights = {
  body: '400',
  links: '500',
  heading: '700'
};

const lineHeights = {
  body: '1.5',
  heading: '1.1',
  code: '1.2'
};

const media = {
  sm: `(min-width: 700px)`,
  md: `(min-width: 960px)`,
  lg: `(min-width: 1200px)`
};

const spacing = {
  xs: '0.6rem',
  sm: '1.5rem',
  md: '2.75rem',
  lg: '4.75rem',
  xl: '8.2rem'
};

export const theme = {
  borderRadius,
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  media,
  spacing
};
