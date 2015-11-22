import React, { PropTypes } from "react";
import Base from "./base";
import Radium from "radium";

@Radium
class Link extends Base {
  render() {
    return (
      <a href={this.props.href} target={this.props.target} style={[this.context.styles.components.link, this.getStyles(), this.props.style]}>
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

export default Link;
