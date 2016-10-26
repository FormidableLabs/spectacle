import { Component, PropTypes } from "react";
import { updateRoute } from "../actions";

class Context extends Component {
  static displayName = "Context";
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
  constructor() {
    super(...arguments);
    this._handleLocationChange = this._handleLocationChange.bind(this);
  }
  getChildContext() {
    const { history, styles, store } = this.props;
    return {
      history,
      styles,
      store
    };
  }
  componentWillReceiveProps(nextProps) {
    this._handleLocationChange(nextProps);
  }
  _handleLocationChange({ history, store }) {
    store.dispatch(updateRoute(history.location));
  }
  render() {
    return this.props.children;
  }
}

export default Context;
