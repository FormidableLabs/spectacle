import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class Cite extends Component {
  render() {
    return (
      <cite className={this.props.className} style={[this.context.styles.components.cite, getStyles.call(this), this.props.style]}>
        - {this.props.children}
      </cite>
    );
  }
}

Cite.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

Cite.contextTypes = {
  styles: PropTypes.object
};
