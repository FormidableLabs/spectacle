import React from "react/addons";
import highlight from "highlight.js";
import Base from "./base";
import Radium from "radium";

@Radium
class CodePane extends Base {
  createMarkup() {
    const markup = highlight.highlight(this.props.lang, this.props.source);
    return {
      __html: markup.value
    };
  }
  render() {
    return (
      <pre style={[this.context.styles.components.codePane.pre, this.getStyles()]}>
        <code
          className="hljs"
          style={this.context.styles.components.codePane.code}
          dangerouslySetInnerHTML={this.createMarkup()}/>
      </pre>
    );
  }
}

CodePane.contextTypes = {
  styles: React.PropTypes.object
};

CodePane.propTypes = {
  lang: React.PropTypes.string,
  source: React.PropTypes.string
};

CodePane.defaultProps = {
  lang: "html",
  source: ""
};

export default CodePane;
