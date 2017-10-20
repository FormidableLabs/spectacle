import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledTableItem = styled.td(props => props.styles);

export default class TableItem extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <StyledTableItem
        className={this.props.className}
        style={[
          this.context.styles.components.tableItem,
          getStyles.call(this),
          typefaceStyle,
          this.props.style
        ]}
      >
        {this.props.children}
      </StyledTableItem>
    );
  }
}

TableItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

TableItem.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
