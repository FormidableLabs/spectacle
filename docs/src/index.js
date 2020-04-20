import React from 'react';
import { render, hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';

export default App;

if (typeof document !== 'undefined') {
  const renderMethod = module.hot ? render : hydrate;
  const mount = Comp => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      document.getElementById('root')
    );
  };

  mount(App);
  if (module.hot) {
    module.hot.accept('./app', () => mount(require('./app').default));
  }
}
