import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class List extends Component {
  render() {
    return (
      <ul className={this.props.className} style={[this.context.styles.components.list, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </ul>
    );
  }
}

List.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

List.contextTypes = {
  styles: PropTypes.object
};
