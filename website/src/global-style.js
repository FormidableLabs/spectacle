import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: inherit;
    min-width: 0;
  }

  body {
    margin: 0;
    padding: 0;
    background: ${({ theme }) => theme.colors.bgLight};
    color: ${({ theme }) => theme.colors.textDark};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.bodySmall};
    font-weight: ${({ theme }) => theme.fontWeights.body};  
    line-height: ${({ theme }) => theme.lineHeights.body};
    text-rendering: optimizeLegibility;

    @media ${({ theme }) => theme.media.lg} {
      font-size: ${({ theme }) => theme.fontSizes.body};
    }
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.link};
    font-weight: ${({ theme }) => theme.fontWeights.heading};

    &:hover {
      color: ${({ theme }) => theme.colors.linkHover};
      text-decoration: none;
    }

    &:any-link:hover {
    color: inherit;
    text-decoration: none;
  }


  }

  table, pre, p, h1, h2, h3 {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  }

  h1, h2, h3 {
    font-weight: ${({ theme }) => theme.fontWeights.heading};
    line-height: ${({ theme }) => theme.lineHeights.heading};
    color: ${({ theme }) => theme.colors.textLight};
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes.h1};
  }
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }
  img {
    max-width: 100%;
  }
`;
