import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Router } from 'react-static';
import { hot } from 'react-hot-loader';
import Template from './template';
import Analytics from './google-analytics';
// Routes generated at build-time
// eslint-disable-next-line import/no-unresolved
import Routes from 'react-static-routes';
// import default prism theme styles
import 'prismjs/themes/prism.css';

const scrollSidebar = async (location, activeItemClass = '.active') => {
  const actives = document.querySelectorAll(activeItemClass);
  const last = actives[actives.length - 1];
  last.scrollIntoView();
};

const checkScrollRoutes = (pathname, routes = ['docs']) =>
  routes.some(r => pathname.includes(r));

class ScrollToTop extends Component {
  componentDidMount() {
    if (
      typeof window !== 'undefined' &&
      checkScrollRoutes(this.props.location.pathname)
    ) {
      scrollSidebar(this.props.location);
    }
  }

  componentDidUpdate() {
    if (
      typeof window !== 'undefined' &&
      checkScrollRoutes(this.props.location.pathname)
    ) {
      scrollSidebar(this.props.location);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object
};

const WrappedScrollToTop = withRouter(ScrollToTop);

let history;
if (typeof window !== 'undefined') {
  const createBrowserHistory = require('history').createBrowserHistory;
  const { stage, landerBasePath } = require('../static-config-parts/constants');
  history =
    stage === 'development'
      ? createBrowserHistory()
      : createBrowserHistory({ basename: `/${landerBasePath}` });
}

// eslint-disable-next-line react/no-multi-comp
const App = () => (
  <Router
    showErrorsInProduction={false}
    autoScrollToHash={false}
    scrollToHashDuration={100}
    autoScrollToTop
    history={history}
  >
    <WrappedScrollToTop>
      <Analytics id="UA-43290258-1">
        <Template>
          <Routes />
        </Template>
      </Analytics>
    </WrappedScrollToTop>
  </Router>
);

export default hot(module)(App);
