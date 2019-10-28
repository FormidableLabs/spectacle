import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import configureStore from '../store';

import Controller from '../utils/controller';
import Manager from './manager';

const store = configureStore();

export function defaultOnStateChange(prevState, nextState) {
  if (nextState) {
    document.documentElement.classList.add(nextState);
  }

  if (prevState) {
    document.documentElement.classList.remove(prevState);
  }
}

export default class Deck extends Component {
  static displayName = 'Deck';

  static propTypes = {
    autoplay: PropTypes.bool,
    autoplayDuration: PropTypes.number,
    autoplayLoop: PropTypes.bool,
    autoplayOnStart: PropTypes.bool,
    children: PropTypes.node,
    controls: PropTypes.bool,
    disableKeyboardControls: PropTypes.bool,
    disableTouchControls: PropTypes.bool,
    globalStyles: PropTypes.bool,
    history: PropTypes.object,
    onStateChange: PropTypes.func,
    progress: PropTypes.oneOf(['pacman', 'bar', 'number', 'none']),
    showFullscreenControl: PropTypes.bool,
    theme: PropTypes.object,
    transition: PropTypes.array,
    transitionDuration: PropTypes.number
  };

  static defaultProps = {
    onStateChange: defaultOnStateChange,
    showFullscreenControl: true
  };

  state = {
    slideState: undefined
  };

  componentWillUnmount() {
    // Cleanup default onStateChange
    if (this.state.slideState && !this.props.onStateChange) {
      document.documentElement.classList.remove(this.state.slideState);
    }
  }

  handleStateChange = nextState => {
    const prevState = this.state.slideState;
    if (prevState !== nextState) {
      this.props.onStateChange(prevState, nextState);
      this.setState({ slideState: nextState });
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Controller
          theme={this.props.theme}
          store={store}
          history={this.props.history}
          onStateChange={this.handleStateChange}
        >
          <Manager {...this.props}>{this.props.children}</Manager>
        </Controller>
      </Provider>
    );
  }
}
