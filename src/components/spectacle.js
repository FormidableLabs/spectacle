import React, { Component, PropTypes } from "react";
import context from "../utils/context";

import { Router, Route } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import createHashHistory from "history/lib/createHashHistory";

import { Provider } from "react-redux";
import configureStore from "../store";

import { syncReduxAndRouter } from "redux-simple-router";

import theme from "../themes/default";

const store = configureStore();
const history = process.env.NODE_ENV === "production" ?
  createHashHistory() :
  createBrowserHistory();

syncReduxAndRouter(history, store, (state) => state.routeReducer);

const createChild = (props) => {
  return class Presentation extends Component {
    render() {
      return props.children;
    }
  };
};

export default class Spectacle extends Component {
  static propTypes = {
    theme: PropTypes.object
  }

  render() {
    const styles = this.props.theme ? this.props.theme : theme();
    const Deck = context(createChild(this.props), {styles: styles.screen, print: styles.print});
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Deck}/>
          <Route path="/:slide" component={Deck}/>
        </Router>
      </Provider>
    );
  }
}

