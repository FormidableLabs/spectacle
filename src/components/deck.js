import React, { Component, PropTypes } from "react";

import { Provider } from "react-redux";
import configureStore, { subscribe, setupRemote } from "../store";

import Controller from "../utils/controller";
import Manager from "./manager";

const store = configureStore();

export default class Deck extends Component {
  static displayName = "Deck";

  static propTypes = {
    children: PropTypes.node,
    controls: PropTypes.bool,
    globalStyles: PropTypes.bool,
    history: PropTypes.object,
    progress: PropTypes.oneOf(["pacman", "bar", "number", "none"]),
    remote: PropTypes.object,
    theme: PropTypes.object,
    transition: PropTypes.array,
    transitionDuration: PropTypes.number
  };

  componentWillMount() {
    const { remote } = this.props;

    if (remote) {
      subscribe(remote);
      setupRemote(remote);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Controller theme={this.props.theme} store={store} history={this.props.history}>
          <Manager {...this.props}>
            {this.props.children}
          </Manager>
        </Controller>
      </Provider>
    );
  }
}
