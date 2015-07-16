import React from "react/addons";
import katex from "katex";
import Base from "./base";

export class Math extends Base {
  constructor(props) {
    super(props);
    this.state = {
        html: this.generateHtml(this.props)
    };
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.html = this.generateHtml(nextProps);
  }

  generateHtml(props) {
    return katex.renderToString(props.math || props.children, {
      displayMode: this.props.displayMode
    });
  }

  render() {
    const markup = {__html: this.state.html};
    if (this.props.displayMode === false) {
      return <span style={this.getStyles()} dangerouslySetInnerHTML={markup}></span>;
    } else {
      return <div style={this.getStyles()} dangerouslySetInnerHTML={markup}></div>;
    }
  }
}

Math.propTypes = {
  children: React.PropTypes.string,
  displayMode: React.PropTypes.bool
};

Math.defaultProps = {
  math: false,
  displayMode: false
};

export default Math;
