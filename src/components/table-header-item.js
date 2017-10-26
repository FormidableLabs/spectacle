import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledTableHeaderItem = styled.td(props => props.styles);

export default class TableHeaderItem extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <StyledTableHeaderItem
        className={this.props.className}
        style={[
          this.context.styles.components.tableHeaderItem,
          getStyles.call(this),
          typefaceStyle,
          this.props.style
        ]}
      >
        {this.props.children}
      </StyledTableHeaderItem>
    );
  }
}

TableHeaderItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

TableHeaderItem.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
