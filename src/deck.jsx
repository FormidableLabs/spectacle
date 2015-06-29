import React from 'react/addons';
import assign from 'object-assign';
import cloneWithProps from 'react/lib/cloneWithProps';

const TransitionGroup = React.addons.TransitionGroup;

class Deck extends React.Component {
  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }
  componentDidMount() {
    this._attachEvents();
  }
  componentWillUnmount() {
    this._detchEvents();
  }
  _attachEvents() {
    window.addEventListener('keydown', this._handleKeyPress);
  }
  _detachEvents() {
    window.removeEventListener('keydown', this._handleKeyPress);
  }
  _handleKeyPress(e) {
    let event = window.event ? window.event : e;
    event.keyCode === 37 && this._prevSlide();
    event.keyCode === 39 && this._nextSlide();
  }
  _prevSlide() {
    let slide = 'slide' in this.context.router.state.params ?
      parseInt(this.context.router.state.params.slide) : 0;
    if (slide > 0) {
      this.context.router.transitionTo('/' + (slide - 1));
    }
  }
  _nextSlide() {
    let slide = 'slide' in this.context.router.state.params ?
      parseInt(this.context.router.state.params.slide) : 0;
    if (slide < this.props.children.length - 1) {
      this.context.router.transitionTo('/' + (slide + 1));
    }
  }
  _renderSlide() {
    let slide = 'slide' in this.context.router.state.params ?
      parseInt(this.context.router.state.params.slide) : 0;
    return cloneWithProps(
      this.props.children[slide],
      {
        key: slide
      });
  }
  render() {
    let styles = {

    };
    return (
      <div style={assign(styles, this.context.styles.deck)}>
        <TransitionGroup>
          {this._renderSlide()}
        </TransitionGroup>
      </div>
    )
  }
}

Deck.displayName = 'Deck';

Deck.contextTypes = {
  styles: React.PropTypes.object,
  router: React.PropTypes.object
};

export default Deck;