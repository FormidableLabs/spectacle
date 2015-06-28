import React from 'react/addons';
import Context from './src/utils/context';

import Deck from './deck';
import Styles from './themes/default/';

require('normalize.css');

class Presentation extends React.Component {
  render() {
    return <Deck/>
  }
}

Presentation = Context(Presentation, {styles: Styles});

React.render(<Presentation/>, document.body);