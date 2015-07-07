'use strict';

import React from 'react/addons';
import cloneWithProps from "react/lib/cloneWithProps";

const TransitionGroup = React.addons.TransitionGroup;

class ReactTransitionGroup extends TransitionGroup {
  constructor(props) {
    super(props);
  }
  render() {
    var childrenToRender = [];
    var children = this.state.children;
    for (var key in children) {
      var child = children[key];
      if (child) {
        childrenToRender.push(cloneWithProps(
          this.props.childFactory(child),
          {ref: key, key: key}
        ));
      }
    }
    return React.createElement(
      this.props.component,
      this.props,
      childrenToRender.reverse()
    );
  }
}

module.exports = ReactTransitionGroup;