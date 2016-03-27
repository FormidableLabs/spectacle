import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class Table extends Component {
  render() {
    return (
      <table className={this.props.className} style={[this.context.styles.components.table, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </table>
    );
  }
}

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Table.contextTypes = {
  styles: PropTypes.object
};
