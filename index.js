import React, { PropTypes } from "react";
import { render } from "react-dom";
import context from "./src/utils/context";

import { Router, Route } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import createHashHistory from "history/lib/createHashHistory";

import { Provider } from "react-redux";
import configureStore from "./src/store";

import { syncReduxAndRouter } from "redux-simple-router";

import Deck from "./presentation/deck";
import config from "./presentation/config";

require("normalize.css");
require("./themes/default/index.css");
require("highlight.js/styles/monokai_sublime.css");

const store = configureStore()
const history = process.env.NODE_ENV === "production" ?
  createHashHistory() :
  createBrowserHistory();

syncReduxAndRouter(history, store, state => state.routeReducer);

const Presentation = () => <Deck />;

Presentation.contextTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

const PresentationContext = context(Presentation, {styles: config.theme, print: config.print});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={PresentationContext} />
      <Route path="/:slide" component={PresentationContext} />
    </Router>
  </Provider>
, document.getElementById("root"));
