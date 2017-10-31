import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';
import katex from 'katex';

const StyledMath = styled.span(props => props.styles);
const StyledDisplayMath = styled.div(props => props.styles);

/**
 * KaTeX based Math tag for rendering LaTeX based math inside spectacle.
 * 
 * Following features are supported:
 *  - displayMode
 *  - Usage of react children attribute for input
 *  - Usage of math attribute for input
 *  - Pass in additional styling in the theme
 *  - Renders the error message when rendering fails
 * @export
 * @class Math
 * @extends {Component}
 */
export default class Math extends Component {
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
    let rendered;
    try {
      rendered = katex.renderToString(props.math || props.children, {
        displayMode: this.props.displayMode
      });
    } catch (e) {
      rendered = `<span>${e.message}</span>`;
    }

    return rendered;
  }

  render() {
    const markup = { __html: this.state.html };
    const MathTag = this.props.displayMode ? StyledDisplayMath : StyledMath;

    return (
      <MathTag
        className={this.props.className}
        styles={[
          this.context.styles.components.math,
          getStyles.call(this),
          this.props.style
        ]}
        dangerouslySetInnerHTML={markup}
      />
    );
  }
}

Math.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  displayMode: PropTypes.bool,
  math: PropTypes.string,
  style: PropTypes.object
};

Math.defaultProps = {
  math: null,
  displayMode: false
};

Math.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
