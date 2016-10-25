import React, { Component, PropTypes } from "react";

import { createHashHistory } from "history";

import theme from "../themes/default";
import Context from "./context";
import { updateRoute } from "../actions";

const history = createHashHistory();

export default class Controller extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    store: PropTypes.object,
    theme: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      print: false
    };
    this.history = props.history || history;
  }
  componentDidMount() {
    this.unlisten = this.history.listen(this._updateRoute.bind(this));
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }
  componentWillUnmount() {
    this.unlisten();
  }
  _updateRoute(location) {
    this.setState({
      print: location.search.indexOf("print") !== -1
    }, () => {
      this.props.store.dispatch(updateRoute(location));
    });
  }
  render() {
    const styles = this.props.theme ? this.props.theme : theme();
    return (
      <Context
        store={this.props.store}
        history={this.history}
        styles={this.state.print ? styles.print : styles.screen}
      >
        {this.props.children}
      </Context>
    );
  }
}
