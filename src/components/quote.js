import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class Quote extends Component {
  render() {
    return (
      <span className={this.props.className} style={[this.context.styles.components.quote, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </span>
    );
  }
}

Quote.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

Quote.contextTypes = {
  styles: PropTypes.object
};
