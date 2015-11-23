import React, { PropTypes } from "react";
import highlight from "highlight.js";
import Base from "./base";
import Radium from "radium";
import isUndefined from "lodash/lang/isundefined";

@Radium
export default class CodePane extends Base {
  createMarkup() {
    const { source, children, lang } = this.props;
    // Allow code to come from source or from children, for markdown support
    const language = highlight.getLanguage(lang);
    const code = (isUndefined(source) || source === "") ? children : source;
    const markup = highlight.highlightAuto(code, language ? language.aliases : undefined);
    return {
      __html: markup.value
    };
  }
  render() {
    return (
      <pre style={[this.context.styles.components.codePane.pre, this.getStyles(), this.props.style]}>
        <code
          className="hljs"
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
  style: PropTypes.object
};

CodePane.defaultProps = {
  lang: "",
  source: ""
};
