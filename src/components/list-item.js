import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

const bulletStyles = {
  star: '\\2605',
  classicCheck: '\\2713',
  greenCheck: '\\2705',
  arrow: '\\27a4',
  cross: '\\274C'
};
const getListStyle = props => {
  if (props.bulletStyle) {
    return [
      { listStyleType: 'none' },
      `&::before {
        content: '${bulletStyles[props.bulletStyle]}';
        margin: 0 25px;
    }`
    ];
  }
  return undefined;
};

const StyledListItem = styled.li(
  props => props.styles,
  props => getListStyle(props)
);

export default class ListItem extends Component {
  render() {
    const typefaceStyle = this.context.typeface || {};
    return (
      <StyledListItem
        className={this.props.className}
        bulletStyle={this.props.bulletStyle}
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
  bulletStyle: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

ListItem.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
};
