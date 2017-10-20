import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledOrderedList = styled.ol(props => props.styles);
const StyledList = styled.ul(props => props.styles);

export default class List extends Component {
  render() {
    return this.props.ordered ? (
      <StyledOrderedList
        reversed={this.props.reversed}
        start={this.props.start}
        type={this.props.type}
        className={this.props.className}
        styles={[
          this.context.styles.components.list,
          getStyles.call(this),
          this.props.style
        ]}
      >
        {this.props.children}
      </StyledOrderedList>) : (
      <StyledList
        className={this.props.className}
        styles={[
          this.context.styles.components.list,
          getStyles.call(this),
          this.props.style
        ]}
      >
        {this.props.children}
      </StyledList>);
  }
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  ordered: PropTypes.bool,
  reversed: PropTypes.bool,
  start: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string
};

List.defaultProps = {
  ordered: false,
  reversed: false,
  start: 1,
  type: '1'
};

List.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
