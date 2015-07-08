/*global window*/

import React from "react/addons";
import Base from "./base";
import Radium from "radium";

@Radium
class Text extends Base {
  constructor(props) {
    super(props);
    this.resize = this.resize.bind(this);
    this.state = {
      width: 256,
      height: 24
    };
  }
  componentDidMount() {
    this.resize();
    window.addEventListener("load", this.resize);
  }
  componentWillReceiveProps() {
    this.resize();
  }
  resize() {
    if (this.props.fit) {
      const el = React.findDOMNode(this.refs.text);
      const state = this.state;
      const width = el.offsetWidth || el.getComputedTextLength();
      const height = el.offsetHeight || 24;
      if (state.width !== width || state.height !== height) {
        this.setState({
          width,
          height
        });
      }
    }
  }
  render() {
    const viewBox = [
      0, 0,
      this.state.width,
      this.state.height - 8
    ].join(" ");
    const styles = {
      svg: {
        width: "100%",
        maxHeight: "100%",
        fill: "currentcolor",
        overflow: "visible"
      },
      text: {
        fontFamily: "inherit",
        fontSize: "1rem",
        fontWeight: "inherit",
        textAnchor: "middle"
      }
    };
    return this.props.fit
    ? <span style={[this.context.styles.components.text, this.getStyles()]}>
        <svg {...this.props}
          viewBox={viewBox}
          style={styles.svg}>
          <text
            ref='text'
            x='50%'
            y='13'
            style={styles.text}>
            {this.props.children}
          </text>
        </svg>
      </span>
    : <p style={[this.context.styles.components.text, this.getStyles()]}>
        {this.props.children}
      </p>;
  }
}

Text.contextTypes = {
  styles: React.PropTypes.object
};

export default Text;
