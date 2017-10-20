import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledTableRow = styled.tr(props => props.styles);


export default class TableRow extends Component {
  render() {
    return (
      <StyledTableRow
        className={this.props.className}
        style={[
          this.context.styles.components.tableRow,
          getStyles.call(this),
          this.props.style
        ]}
      >
        {this.props.children}
      </StyledTableRow>
    );
  }
}

TableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

TableRow.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};
