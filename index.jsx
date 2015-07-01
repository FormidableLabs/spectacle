import React from 'react/addons';
import Context from './src/utils/context';

import { Router, Route, DefaultRoute, Link } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';

import Alt from "alt";
import Flux from './src/flux/alt';
import withAltContext from 'alt/utils/withAltContext'

import Deck from './presentation/deck';
import config from './presentation/config';

require('normalize.css');
require('./themes/default/index.css');
require('highlight.js/styles/monokai_sublime.css');

const flux = new Flux();
Alt.debug('flux', flux);

class Presentation extends React.Component {
  render() {
    return <Deck/>
  }
}

Presentation.contextTypes = {
  router: React.PropTypes.object
}

Presentation = Context(Presentation, {styles: config.theme, flux: flux});

React.render(
  <Router history={new HashHistory}>
    <Route path="/" component={Presentation} />
    <Route path="/:slide" component={Presentation} />
  </Router>
, document.body);