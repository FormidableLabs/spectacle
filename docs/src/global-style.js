import { createGlobalStyle } from 'styled-components';

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

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 10px;
  }

  html {
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
  }

  body {
    background: #fff;
    color: #3b3b3b;
    font-family: ${systemFonts.join(',')};
    font-size: 1.3rem;
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
    letter-spacing: 0;
  }

  a {
    text-decoration: none;
  }

  img {
    max-width: 100%;
  }


  .gatsby-highlight {
    code {
      border: none !important;
    }
  }
`;
