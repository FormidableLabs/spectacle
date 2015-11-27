import React, { Component, PropTypes } from "react";
import Radium from "radium";
import { styleBase } from "../utils/base";

@Radium
export default class ListItem extends Component {
  render() {
    return (
      <li style={[this.context.styles.components.listItem, styleBase(this.props, this.context), this.props.style]}>
        {this.props.children}
      </li>
    );
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};

ListItem.contextTypes = {
  styles: PropTypes.object
};
