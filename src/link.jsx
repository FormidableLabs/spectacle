import React from "react/addons";
import Base from "./base";
import Radium from "radium";

@Radium
class Link extends Base {
  render() {
    return (
      <a href={this.props.href} style={[this.context.styles.components.link, this.getStyles()]}>
        {this.props.children}
      </a>
    );
  }
}

Link.propTypes = {
  children: React.PropTypes.node,
  href: React.PropTypes.string
};

Link.contextTypes = {
  styles: React.PropTypes.object
};

export default Link;
