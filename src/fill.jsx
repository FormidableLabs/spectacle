import React from "react/addons";
import Radium from "radium";

@Radium
class Fill extends React.Component {
  render() {
    const styles = {
      flex: 1
    };
    return (
      <div style={[styles, this.props.style]}>
        {this.props.children}
      </div>
    );
  }
}

Fill.propTypes = {
  children: React.PropTypes.node,
  style: React.PropTypes.object
};

export default Fill;
