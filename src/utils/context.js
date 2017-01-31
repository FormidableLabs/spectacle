import { Component, PropTypes } from "react";
import { updateRoute } from "../actions";
import { countSlides } from "./slides";

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
    this._handleLocationChange(this.props);
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
  _handleLocationChange({ history, store, children: deck }) {
    const slideCount = countSlides(deck.props.children);
    store.dispatch(updateRoute({
      location: history.location,
      slideCount
    }));
  }
  render() {
    return this.props.children;
  }
}

export default Context;
