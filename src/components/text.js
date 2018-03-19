import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const FitText = styled.div(({ height, styles }) => [
  styles.context,
  styles.base,
  {
    display: 'block',
    width: '100%',
    height
  },
]);

const FitTextContent = styled.span(({ lineHeight, scale, styles }) => [
  {
    fontSize: 16,
    display: 'block',
    margin: '0',
    padding: '0',
    lineHeight,
    transform: `scale(${scale})`,
    transformOrigin: 'center top'
  },
  styles.typeface,
  styles.user
]);

const UnfitText = styled.p(({ lineHeight, styles }) => [
  styles.context,
  styles.base,
  { lineHeight },
  styles.typeface,
  styles.user
]);

export default class Text extends Component {
  constructor() {
    super(...arguments);
    this.resize = this.resize.bind(this);
    this.state = {
      scale: 1,
      height: 16
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
      const scale = (container.offsetWidth / text.offsetWidth);
      const height = (text.offsetHeight * scale) || 0;
      text.style.display = 'block';
      this.setState({
        scale,
        height
      });
    }
  }
  render() {
    const { lineHeight, fit, style, children } = this.props;
    const typefaceStyle = this.context.typeface || {};
    return (
      fit ? (
        <FitText
          className={this.props.className}
          innerRef={(c) => { this.containerRef = c; }}
          height={this.state.height}
          styles={{
            context: this.context.styles.components.text,
            base: getStyles.call(this)
          }}
        >
          <FitTextContent
            innerRef={(t) => { this.textRef = t; }}
            lineHeight={lineHeight}
            scale={this.state.scale}
            styles={{ user: style, typeface: typefaceStyle }}
          >
            {children}
          </FitTextContent>
        </FitText>
      ) : (
        <UnfitText
          className={this.props.className}
          styles={{
            context: this.context.styles.components.text,
            base: getStyles.call(this),
            typeface: typefaceStyle,
            user: style
          }}
        >
          {children}
        </UnfitText>
      )
    );
  }
}

Text.defaultProps = {
  lineHeight: 1
};

Text.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  fit: PropTypes.bool,
  lineHeight: PropTypes.number,
  style: PropTypes.object
};

Text.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
