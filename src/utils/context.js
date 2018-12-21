import { Component } from 'react';
import PropTypes from 'prop-types';

class Context extends Component {
  static displayName = 'Context';
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    onStateChange: PropTypes.func,
    store: PropTypes.object,
    styles: PropTypes.object
  };
  static childContextTypes = {
    history: PropTypes.object,
    onStateChange: PropTypes.func,
    styles: PropTypes.object,
    store: PropTypes.object
  };
  getChildContext() {
    const { history, onStateChange, styles, store } = this.props;
    return {
      history,
      onStateChange,
      store,
      styles
    };
  }
  render() {
    return this.props.children;
  }
}

export default Context;
