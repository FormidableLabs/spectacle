import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledTable = styled.table(props => props.styles);

export default class Table extends Component {
  render() {
    return (
      <StyledTable
        className={this.props.className}
        styles={[
          this.context.styles.components.table,
          getStyles.call(this),
          this.props.style
        ]}
      >
        {this.props.children}
      </StyledTable>
    );
  }
}

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Table.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
