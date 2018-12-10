import { Component } from 'react';
import PropTypes from 'prop-types';

class Context extends Component {
  static displayName = 'Context';
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    store: PropTypes.object,
    styles: PropTypes.object
  };
  static childContextTypes = {
    styles: PropTypes.object,
    history: PropTypes.object,
    store: PropTypes.object
  };
  getChildContext() {
    const { history, styles, store } = this.props;
    return {
      history,
      styles,
      store
    };
  }
  render() {
    return this.props.children;
  }
}

export default Context;
