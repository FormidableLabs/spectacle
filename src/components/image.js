import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import Radium from 'radium';

@Radium
export default class Image extends Component {
  render() {
    const styles = {
      width: this.props.width || '',
      height: this.props.height || '',
      display: this.props.display || ''
    };
    return (
      <img
        className={this.props.className}
        src={this.props.src}
        style={[
          this.context.styles.components.image,
          getStyles.call(this),
          styles,
          this.props.style
        ]}
      />
    );
  }
}

Image.propTypes = {
  className: PropTypes.string,
  display: PropTypes.string,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  src: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

Image.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
