/*global document*/

import React, { PropTypes } from "react";
import { render } from "react-dom";
import context from "./src/utils/context";

import { Router, Route } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";

import Alt from "alt";
import Flux from "./src/flux/alt";

import Deck from "./presentation/deck";
import config from "./presentation/config";

require("normalize.css");
require("./themes/default/index.css");
require("highlight.js/styles/monokai_sublime.css");

const history = createBrowserHistory();

const flux = new Flux();
Alt.debug("flux", flux);

const Presentation = () => <Deck />;

Presentation.contextTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

const PresentationContext = context(Presentation, {styles: config.theme, print: config.print, flux});

render(
  <Router history={history}>
    <Route path="/" component={PresentationContext} />
    <Route path="/:slide" component={PresentationContext} />
  </Router>
, document.getElementById("root"));
