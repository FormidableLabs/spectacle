import React, { Component, PropTypes } from "react";
import { getStyles } from "../utils/base";
import Radium from "radium";
import { isUndefined } from "lodash";

const format = (str) => {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

@Radium
export default class CodePane extends Component {
  createMarkup() {
    const { source, children } = this.props;
    const code = (isUndefined(source) || source === "") ? children : source;
    return {
      __html: format(code)
    };
  }
  componentDidMount() {
    return window.Prism && window.Prism.highlightAll();
  }
  render() {
    return (
      <pre className={this.props.className} style={[this.context.styles.components.codePane.pre, getStyles.call(this), this.props.style]}>
        <code
          className={`language-${this.props.lang}`}
          style={this.context.styles.components.codePane.code}
          dangerouslySetInnerHTML={this.createMarkup()}
        />
      </pre>
    );
  }
}

CodePane.contextTypes = {
  styles: PropTypes.object
};

CodePane.propTypes = {
  lang: PropTypes.string,
  source: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string
};

CodePane.defaultProps = {
  lang: "markup",
  source: ""
};
