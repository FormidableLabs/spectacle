import React, { Component, PropTypes } from "react";
import HashHistory from "react-history/HashHistory";
import MemoryHistory from "react-history/MemoryHistory";

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
    let History;
    try{
      HashHistory();
      History = HashHistory;
    }catch(e){
      History = MemoryHistory;
    }
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
