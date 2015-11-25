import React, { Component, createElement, PropTypes } from "react";
import Radium from "radium";
import { styleBase, propTypesBase } from "../utils/base";

@Radium
export default class Heading extends Component {
  constructor() {
    super();
    this.resize = this.resize.bind(this);
    this.state = {
      scale: 1,
      height: 16
    };
  }
  componentDidMount() {
    this.resize();
    window.addEventListener("load", this.resize);
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener("load", this.resize);
    window.removeEventListener("resize", this.resize);
  }
  componentWillReceiveProps() {
    this.resize();
  }
  resize() {
    if (this.props.fit) {
      const text = this.refs.text;
      const container = this.refs.container;
      text.style.display = "inline-block";
      const scale = (container.offsetWidth / text.offsetWidth);
      const height = text.offsetHeight * scale;
      text.style.display = "block";
      this.setState({
        scale,
        height
      });
    }
  }
  render() {
    const { size, lineHeight, fit, style, children} = this.props;
    const Tag = `H${size}`;
    const styles = {
      container: {
        display: "block",
        width: "100%",
        height: this.state.height
      },
      text: {
        fontSize: 16,
        display: "block",
        margin: "0",
        padding: "0",
        lineHeight,
        transform: `scale(${this.state.scale})`,
        transformOrigin: "center top"
      },
      nonFit: {
        lineHeight
      }
    };
    return (
      fit ? (
        <div
          ref="container"
          style={[
            this.context.styles.components.heading[`h${size}`],
            styleBase(this.props, this.context), styles.container
          ]}
        >
          <span ref="text" style={[styles.text, style]}>
            {children}
          </span>
        </div>
      ) : (
        createElement(Tag, {
          style: [this.context.styles.components.heading[`h${size}`], styleBase(this.props, this.context), styles.nonFit, style]
        }, children)
      )
    );
  }
}

Heading.defaultProps = {
  size: 1,
  lineHeight: 1
};

Heading.propTypes = Object.assign({}, propTypesBase, {
  fit: PropTypes.bool,
  lineHeight: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.node
});

Heading.contextTypes = {
  styles: PropTypes.object
};
