import React from 'react';
import propTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { DeckInternal } from '../deck/deck';
import { AnimatedDiv } from '../slide/slide';
import defaultTheme, {
  SpectacleThemeOverrides
} from '../../theme/default-theme';

const Backdrop = styled.div`
  background-color: white;
`;

type PrintStyleProps = { pageSize: string; pageOrientation: string };
const PrintStyle = createGlobalStyle<PrintStyleProps>`
  @media print {
    body, html {
      margin: 0;
    }
    @page {
      size: ${({ pageSize, pageOrientation }) =>
        `${pageSize} ${pageOrientation}`.trim()};
    }
    ${AnimatedDiv} {
      @page {
        margin: 0;
      }
    }
  }
`;

type PrintModeProps = {
  children: React.ReactNode;
  theme?: SpectacleThemeOverrides;
  exportMode?: boolean;
  pageSize?: string;
  pageOrientation?: string;
};

export default function PrintMode({
  children,
  theme,
  exportMode,
  pageSize,
  pageOrientation = ''
}: PrintModeProps) {
  const width = theme?.size?.width || defaultTheme.size.width;
  const height = theme?.size?.height || defaultTheme.size.height;
  const computedPageSize = pageSize || `${width / 100}in ${height / 100}in`;
  return (
    <>
      <PrintStyle
        pageSize={computedPageSize}
        pageOrientation={pageOrientation}
      />
      <DeckInternal
        printMode
        exportMode={exportMode}
        disableInteractivity
        theme={{ ...theme, Backdrop, backdropStyle: {} }}
      >
        {children}
      </DeckInternal>
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
