import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const StyledListItem = styled.li(props => props.styles);

export default class ListItem extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <StyledListItem
        className={this.props.className}
        styles={[
          this.context.styles.components.listItem,
          getStyles.call(this),
          typefaceStyle,
          this.props.style
        ]}
      >
        {this.props.children}
      </StyledListItem>
    );
  }
}

ListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

ListItem.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
