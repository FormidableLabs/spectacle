import React from "react/addons";
import Base from "./base";
import Radium from "radium";

@Radium
class List extends Base {
  render() {
    return (
      <ul style={[this.context.styles.components.list, this.getStyles(), this.props.style]}>
        {this.props.children}
      </ul>
    );
  }
}

List.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

List.contextTypes = {
  styles: React.PropTypes.object
};

export default List;
