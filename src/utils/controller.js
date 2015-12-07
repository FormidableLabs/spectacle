import React, { Component, PropTypes } from "react";

import createBrowserHistory from "history/lib/createBrowserHistory";
import createHashHistory from "history/lib/createHashHistory";

import context from "../utils/context";
import theme from "../themes/default";
import { updateRoute } from "../actions";

const history = process.env.NODE_ENV === "production" ?
  createHashHistory() :
  createBrowserHistory();

export default class Controller extends Component {
  static propTypes = {
    theme: PropTypes.object,
    children: PropTypes.node,
    store: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      print: false
    };
  }
  _updateRoute(location) {
    this.setState({
      print: location.search.indexOf("print") !== -1
    }, () => {
      this.props.store.dispatch(updateRoute(location));
    });
  }
  componentDidMount() {
    this.unlisten = history.listen(this._updateRoute.bind(this));
  }
  componentWillUnmount() {
    this.unlisten();
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }
  render() {
    const styles = this.props.theme ? this.props.theme : theme();
    const Context = context(React.Children.only(this.props.children), {
      history,
      styles: this.state.print ? styles.print : styles.screen,
      print: styles.print,
      store: this.props.store
    });
    return <Context />;
  }
}

