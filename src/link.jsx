import React from "react/addons";
import Base from "./base";
import Radium from "radium";

@Radium
class Link extends Base {
  render() {
    return (
      <a href={this.props.href} style={[this.context.styles.components.link, this.getStyles(), this.props.style]}>
        {this.props.children}
      </a>
    );
  }
}

Link.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string,
  style: React.PropTypes.object
};

Link.contextTypes = {
  styles: React.PropTypes.object
};

export default Link;
