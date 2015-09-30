/*global document*/

import React from "react";
import ReactDOM from "react-dom";
import context from "./src/utils/context";

import {Router, Route} from "react-router";
import createHashHistory from 'history/lib/createHashHistory';

import Alt from "alt";
import Flux from "./src/flux/alt";

import Deck from "./presentation/deck";
import config from "./presentation/config";

require("normalize.css");
require("./themes/default/index.css");
require("highlight.js/styles/monokai_sublime.css");

const flux = new Flux();
Alt.debug("flux", flux);

class Presentation extends React.Component {
  render() {
    return <Deck />;
  }
}

Presentation.contextTypes = {
  location: React.PropTypes.object,
  history: React.PropTypes.object
};

const PresentationContext = context(Presentation, {styles: config.theme, print: config.print, flux});

ReactDOM.render(
  <Router history={createHashHistory()}>
    <Route path="/" component={PresentationContext} />
    <Route path="/:slide" component={PresentationContext} />
  </Router>
, document.getElementById('root'));
