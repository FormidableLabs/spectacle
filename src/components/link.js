import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class Link extends Component {
  render() {
    return (
      <a href={this.props.href} target={this.props.target} style={[this.context.styles.components.link, getStyles.call(this), this.props.style]}>
        {this.props.children}
      </a>
    );
  }
}

Link.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  target: PropTypes.string,
  style: PropTypes.object
};

Link.contextTypes = {
  styles: PropTypes.object
};
