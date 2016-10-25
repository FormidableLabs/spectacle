import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

@Radium
export default class MarkdownWrapper extends Component {
  render() {
    return (
      <div className={this.props.className} style={[getStyles.call(this), this.props.style]}>
        {this.props.children}
      </div>
    );
  }
}

MarkdownWrapper.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

MarkdownWrapper.contextTypes = {
  styles: PropTypes.object
};
