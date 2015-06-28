import React from 'react/addons';
import assign from 'object-assign';

const TransitionGroup = React.addons.TransitionGroup;

class Deck extends React.Component {
  render() {
    let styles = {

    };
    return (
      <div style={assign(styles, this.context.styles.deck)}>
        <TransitionGroup>
          {this.props.children}
        </TransitionGroup>
      </div>
    )
  }
}

Deck.contextTypes = {
  styles: React.PropTypes.object
};

export default Deck;