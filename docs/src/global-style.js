import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: inherit;
    min-width: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: ${p => p.theme.colors.textLight};
    color: ${p => p.theme.colors.text};
    font-family: ${p => p.theme.fonts.body};
    font-size: ${p => p.theme.fontSizes.bodySmall};
    font-weight: ${p => p.theme.fontWeights.body};  
    line-height: ${p => p.theme.lineHeights.body};
    text-rendering: optimizeLegibility;

    @media ${p => p.theme.media.lg} {
      font-size: ${p => p.theme.fontSizes.body};
    }
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: ${p => p.theme.colors.accentLight};
    font-weight: ${p => p.theme.fontWeights.links};
  }

  table, pre, p, h1, h2, h3 {
    margin: 0 0 ${p => p.theme.spacing.md} 0;
  }

  h1, h2, h3 {
    font-family: ${p => p.theme.fonts.heading};
    font-weight: ${p => p.theme.fontWeights.heading};
    line-height: ${p => p.theme.lineHeights.heading};
    color: ${p => p.theme.colors.heading};
  }

  h1 {
    font-size: ${p => p.theme.fontSizes.h1};
  }
  h2 {
    font-size: ${p => p.theme.fontSizes.h2};
  }
  h3 {
    font-size: ${p => p.theme.fontSizes.h3};
  }
  img {
    max-width: 100%;
  }
`;
