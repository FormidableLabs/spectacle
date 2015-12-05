import React, { cloneElement, Component, PropTypes } from "react";

const context = (component, params) => {
  return class Context extends Component {
    static displayName = "ContextWrapper";
    static childContextTypes = {
      styles: PropTypes.object,
      history: PropTypes.object,
      store: PropTypes.object
    };
    getChildContext() {
      let { history, styles, print, store } = params;
      return {
        history,
        styles,
        store
      };
    }
    render() {
      return React.cloneElement(component);
    }
  }
};

export default context;
