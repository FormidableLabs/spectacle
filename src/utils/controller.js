import React, { Component, PropTypes } from "react";
import History from "react-history/HashHistory";

import theme from "../themes/default";
import Context from "./context";

export default class Controller extends Component {
  static propTypes = {
    children: PropTypes.node,
    store: PropTypes.object,
    theme: PropTypes.object
  }
  render() {
    const styles = this.props.theme ? this.props.theme : theme();
    return (
      <History>
        {({ history, location }) => {
          const printEnabled = location.search.indexOf("print") !== -1;
          return (
            <Context
              store={this.props.store}
              history={history}
              styles={printEnabled ? styles.print : styles.screen}
            >
              {this.props.children}
            </Context>
          );
        }}
      </History>

    );
  }
}
