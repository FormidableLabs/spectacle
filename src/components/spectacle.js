import React, { cloneElement, Component, PropTypes } from "react";
import { render } from "react-dom";
import context from "../utils/context";

import { Router, Route } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import createHashHistory from "history/lib/createHashHistory";

import { Provider } from "react-redux";
import configureStore from "../store";

import { syncReduxAndRouter } from "redux-simple-router";

const store = configureStore()
const history = process.env.NODE_ENV === "production" ?
  createHashHistory() :
  createBrowserHistory();

syncReduxAndRouter(history, store, state => state.routeReducer);

const Presentation = (props) => {
  return class extends Component {
    render() {
      return props.children;
    }
  }
}

export default class Spectacle extends Component {
  render() {
    const Deck = context(Presentation(this.props), {styles: this.props.theme, print: this.props.print});
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={Deck}/>
          <Route path="/:slide" component={Deck}/>
        </Router>
      </Provider>
    )
  }
}

