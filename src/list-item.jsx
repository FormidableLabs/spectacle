import React from "react/addons";
import Base from "./base";
import Radium from "radium";

@Radium
class ListItem extends Base {
  render() {
    return (
      <li style={[this.context.styles.components.listItem, this.getStyles(), this.props.style]}>
        {this.props.children}
      </li>
    );
  }
}

ListItem.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

ListItem.contextTypes = {
  styles: React.PropTypes.object
};

export default ListItem;
