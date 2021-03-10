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
    @page {
      size: ${({ pageSize }) => pageSize};
    }
    ${AnimatedDiv} {
      @page {
        margin: 0;
      }
    }
  }
`;

export default function PrintMode(props) {
  const { children, theme, exportMode, pageSize } = props;
  const width = theme?.size?.width || 1366;
  const height = theme?.size?.height || 768;
  const computedPageSize = pageSize || `${width / 100}in ${height / 100}in`;
  return (
    <>
      <PrintStyle pageSize={computedPageSize} />
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
