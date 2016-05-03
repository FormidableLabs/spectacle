import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class TableRow extends Component {
  render() {
    return (
      <tr className={this.props.className} style={[this.context.styles.components.tableRow, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </tr>
    );
  }
}

TableRow.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

TableRow.contextTypes = {
  styles: PropTypes.object
};
