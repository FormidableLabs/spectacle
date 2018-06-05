import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledCite = styled.cite(props => props.styles);

export default class Cite extends Component {
  render() {
    const styles = [
      this.context.styles.components.cite,
      getStyles.call(this),
      this.context.typeface || {},
      this.props.style
    ];
    return (
      <StyledCite className={this.props.className} styles={styles}>
        - {this.props.children}
      </StyledCite>
    );
  }
}

Cite.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Cite.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
