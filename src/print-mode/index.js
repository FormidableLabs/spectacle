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
        size: ${({ pageSize, pageOrientation }) =>
          `${pageSize} ${pageOrientation}`};
        margin: 0;
      }
    }
  }
`;

export default function PrintMode(props) {
  const {
    children,
    theme,
    exportMode,
    pageSize = 'letter',
    pageOrientation = 'landscape'
  } = props;
  return (
    <>
      <PrintStyle pageSize={pageSize} pageOrientation={pageOrientation} />
      <Deck
        printMode
        exportMode={exportMode}
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
  children: propTypes.node.isRequired,
  exportMode: propTypes.bool.isRequired,
  pageSize: propTypes.string,
  pageOrientation: propTypes.oneOf(['landscape', 'portrait'])
};
