import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class ListItem extends Component {
  render() {
    return (
      <li className={this.props.className} style={[this.context.styles.components.listItem, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </li>
    );
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

ListItem.contextTypes = {
  styles: PropTypes.object
};
