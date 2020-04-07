import React, { Suspense } from 'react';
import { Root, Routes } from 'react-static';
import { ThemeProvider } from 'styled-components';
import { theme } from './themes/theme';
import Analytics from './google-analytics';
import { GlobalStyle } from './global-style';

// import default prism theme styles
import 'prismjs/themes/prism.css';

const App = () => (
  <Root>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Analytics id="UA-43290258-1">
        <Suspense fallback={() => 'Loading'}>
          <Routes />
        </Suspense>
      </Analytics>
    </ThemeProvider>
  </Root>
);

export default App;
