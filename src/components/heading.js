import React, { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledHeader = styled.div(({ height, styles }) => [
  styles.context,
  styles.base,
  {
    display: 'block',
    width: '100%',
    height,
  },
]);

const dynamicHeaderFitStyles = ({ scale, lineHeight, styles }) => [
  {
    fontSize: 16,
    display: 'block',
    margin: '0',
    padding: '0',
    lineHeight,
    transform: `scale(${scale})`,
    transformOrigin: 'center top',
  },
  styles.typeface,
  styles.user,
];

const dynamicStyledFitHeaders = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce(
  (memo, tag) => ({
    ...memo,
    [tag]: styled(tag)(dynamicHeaderFitStyles),
  }),
  {}
);

const dynamicHeaderStyles = ({ lineHeight, styles }) => [
  styles.context,
  styles.base,
  { lineHeight },
  styles.typeface,
  styles.user,
];

const dynamicStyledHeaders = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce(
  (memo, tag) => ({
    ...memo,
    [tag]: styled(tag)(dynamicHeaderStyles),
  }),
  {}
);

export default class Heading extends Component {
  constructor() {
    super(...arguments);
    this.resize = this.resize.bind(this);
    this.state = {
      scale: 1,
      height: 16,
    };
  }
  componentDidMount() {
    this.resize();
    window.addEventListener('load', this.resize);
    window.addEventListener('resize', this.resize);
  }
  componentWillReceiveProps() {
    this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener('load', this.resize);
    window.removeEventListener('resize', this.resize);
  }
  resize() {
    if (this.props.fit) {
      const text = this.textRef;
      const container = this.containerRef;
      text.style.display = 'inline-block';
      const scale = container.offsetWidth / text.offsetWidth;
      const height = text.offsetHeight * scale || 0;
      text.style.display = 'block';
      this.setState({
        scale,
        height,
      });
    }
  }
  render() {
    const { size, lineHeight, fit, style, children } = this.props;
    const Tag = `h${size}`;
    const typefaceStyle = this.context.typeface || {};

    if (fit) {
      return (
        <StyledHeader
          className={this.props.className}
          innerRef={c => {
            this.containerRef = c;
          }}
          height={this.state.height}
          styles={{
            context: this.context.styles.components.heading[`h${size}`],
            base: getStyles.call(this),
          }}
        >
          {
            createElement(
              dynamicStyledFitHeaders[Tag],
              {
                innerRef: t => {
                  this.textRef = t;
                },
                scale: this.state.scale,
                lineHeight,
                styles: {
                  user: style,
                  typeface: typefaceStyle
                }
              }, children
            )
          }
        </StyledHeader>
      );
    }

    return createElement(
      dynamicStyledHeaders[Tag],
      {
        className: this.props.className,
        lineHeight,
        styles: {
          context: this.context.styles.components.heading[`h${size}`],
          base: getStyles.call(this),
          user: style,
          typeface: typefaceStyle,
        },
      },
      children
    );
  }
}

Heading.defaultProps = {
  size: 1,
  lineHeight: 1,
};

Heading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fit: PropTypes.bool,
  lineHeight: PropTypes.number,
  size: PropTypes.number,
  style: PropTypes.object,
};

Heading.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object,
};
