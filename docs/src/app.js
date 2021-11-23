import React, { Suspense, useEffect } from 'react';
import { Root, Routes } from 'react-static';
import { ThemeProvider } from 'styled-components';
import Analytics from './google-analytics';
import { initGoogleTagManager } from './google-tag-manager';
import Loading from './components/loading';
import { GlobalStyle } from './global-style';
import { theme } from './theme';

// import default prism theme styles
import 'prismjs/themes/prism.css';

const App = () => {
  useEffect(() => {
    initGoogleTagManager();
  }, []);

  return (
    <Root>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Analytics id="UA-43290258-1">
          <Suspense fallback={<Loading />}>
            <Routes />
          </Suspense>
        </Analytics>
      </ThemeProvider>
    </Root>
  );
};

export default App;
