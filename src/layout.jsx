import React from "react/addons";
import Radium from "radium";

@Radium
class Layout extends React.Component {
  render() {
    const styles = {
      display: "flex"
    };
    return (
      <div style={[styles]}>
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.node
};

export default Layout;
