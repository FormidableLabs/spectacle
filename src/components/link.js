import React, { Component, PropTypes } from "react";
import Radium from "radium";
import { styleBase } from "../utils/base";

@Radium
export default class Link extends Component {
  render() {
    return (
      <a href={this.props.href} target={this.props.target} style={[this.context.styles.components.link, styleBase(this.props, this.context), this.props.style]}>
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
