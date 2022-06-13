import React from 'react';
import { ThemeProvider } from 'styled-components';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { GlobalStyle } from '@site/src/global-style';
import { theme } from '@site/src/theme';
import Header from '@site/src/components/global/header';
import Footer from '@site/src/components/global/footer';
import Features from '@site/src/components/home/features';
import Preview from '@site/src/components/home/preview';
import GetStarted from '@site/src/components/home/get-started';
import MoreOSS from '@site/src/components/home/more-oss';
import content from '@site/src/components/home/_content';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <main>
        <Features />
        <Preview preview={content.preview} />
        <GetStarted getStarted={content.getStarted} />
        <MoreOSS oss={content.oss} />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
