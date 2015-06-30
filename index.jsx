import React from 'react/addons';
import Context from './src/utils/context';
import { Router, Route, DefaultRoute, Link } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';

import Deck from './deck';
import config from './config';

require('normalize.css');
require('highlight.js/styles/monokai.css');

class Presentation extends React.Component {
  render() {
    return <Deck/>
  }
}

Presentation.contextTypes = {
  router: React.PropTypes.object
}

Presentation = Context(Presentation, {styles: config.theme});

React.render(
  <Router history={new HashHistory}>
    <Route path="/" component={Presentation} />
    <Route path="/:slide" component={Presentation} />
  </Router>
, document.body);