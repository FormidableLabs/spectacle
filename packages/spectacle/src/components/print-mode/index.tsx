import { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { DeckInternal, TemplateFn } from '../deck/deck';
import { AnimatedDiv } from '../slide/slide';
import defaultTheme, {
  SpectacleThemeOverrides
} from '../../theme/default-theme';

const Backdrop = styled.div`
  background-color: white;
`;

type PrintStyleProps = { pageSize: string };
const PrintStyle = createGlobalStyle<PrintStyleProps>`
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

export default function PrintMode({
  children,
  theme,
  exportMode,
  pageSize,
  backgroundImage,
  template
}: PrintModeProps) {
  const width = theme?.size?.width || defaultTheme.size.width;
  const height = theme?.size?.height || defaultTheme.size.height;
  const computedPageSize = pageSize || `${width}px ${height}px`;
  return (
    <>
      <PrintStyle pageSize={computedPageSize} />
      <DeckInternal
        printMode
        exportMode={exportMode}
        disableInteractivity
        theme={{ ...theme, Backdrop, backdropStyle: {} }}
        backgroundImage={backgroundImage}
        template={template}
      >
        {children}
      </DeckInternal>
    </>
  );
}

type PrintModeProps = {
  children: ReactNode;
  theme?: SpectacleThemeOverrides;
  exportMode?: boolean;
  pageSize?: string;
  pageOrientation?: '' | 'landscape' | 'portrait';
  backgroundImage?: string;
  template?: TemplateFn | ReactNode;
};
