import React from 'react';
import propTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import Deck from '../components/deck/deck';
import { AnimatedDiv } from '../components/slide/slide';

const Backdrop = styled.div`
  background-color: white;
`;

const PrintStyle = createGlobalStyle`
  @media print {
    body, html {
      margin: 0;
    }
    ${AnimatedDiv} {
      @page {
        size: letter landscape;
        margin: 0;
      }
    }
  }
`;

export default function PrintMode({ children, theme }) {
  return (
    <>
      <PrintStyle />
      <Deck
        printMode
        disableInteractivity
        theme={{ ...theme, Backdrop, backdropStyle: {} }}
      >
        {children}
      </Deck>
    </>
  );
}

PrintMode.propTypes = {
  theme: propTypes.object,
  children: propTypes.node.isRequired
};
