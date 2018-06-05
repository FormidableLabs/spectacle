import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledImg = styled.img(({ styles }) => [
  styles.context,
  styles.base,
  {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  styles.props,
  styles.user
]);

export default class Image extends Component {
  render() {
    const styles = {
      context: this.context.styles.components.image,
      base: getStyles.call(this),
      props: {
        width: this.props.width,
        height: this.props.height,
        display: this.props.display
      },
      user: this.props.style
    };
    return (
      <StyledImg
        className={this.props.className}
        src={this.props.src}
        alt={this.props.alt}
        styles={styles}
      />
    );
  }
}

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  display: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Image.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
