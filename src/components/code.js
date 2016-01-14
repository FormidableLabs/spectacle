import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";

const format = (str) => {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

@Radium
export default class Code extends Component {
  createMarkup() {
    return {
      __html: format(this.props.children)
    };
  }
  render() {
    return (
      <code
        className={this.props.className}
        style={[this.context.styles.components.code, getStyles.call(this), this.props.style]}
        dangerouslySetInnerHTML={this.createMarkup()}
      />
    );
  }
}

Code.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  className: PropTypes.string
};

Code.contextTypes = {
  styles: PropTypes.object
};
