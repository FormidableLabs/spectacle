import React, { Component, PropTypes } from "react";
import Radium from "radium";
import { styleBase, propTypesBase } from "../utils/base";

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

ListItem.propTypes = Object.assign({}, propTypesBase, {
  style: PropTypes.object,
  children: PropTypes.node
});

ListItem.contextTypes = {
  styles: PropTypes.object
};
