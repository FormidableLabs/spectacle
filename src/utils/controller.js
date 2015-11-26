import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";

import createBrowserHistory from "history/lib/createBrowserHistory";
import createHashHistory from "history/lib/createHashHistory";

import context from "../utils/context";
import theme from "../themes/default";
import { updateRoute } from "../actions";

const history = process.env.NODE_ENV === "production" ?
  createHashHistory() :
  createBrowserHistory();

export default class Controller extends Component {
  componentDidMount() {
    this.unlisten = history.listen((location) => {
      this.props.dispatch(updateRoute(location));
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    const styles = this.props.theme ? this.props.theme : theme();
    const Context = context(React.Children.only(this.props.children), {
      history: history,
      styles: styles.screen,
      print: styles.print
    }, {
      dispatch: this.props.dispatch
    });
    return <Context />;
  }
}

