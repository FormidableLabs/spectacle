import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

export const bulletStyles = {
  star: '\\2605',
  classicCheck: '\\2713',
  greenCheck: '\\2705',
  arrow: '\\219d',
  cross: '\\274C'
};

export const getBulletStyle = (bulletStyle, isListItemStyle) => {
  if (bulletStyle) {
    const content = bulletStyles[bulletStyle] || `\\${bulletStyle}`;

    return [
      { listStyleType: 'none' },
      `${isListItemStyle ? '&' : 'li'}::before {
          content: '${content}' ${isListItemStyle ? '!important' : ''};
          display: inline-block;
          margin-right: 40px;
          width: 20px;
          font-size: 20px;
          text-align: center;
          vertical-align: middle;
        }`
    ];
  }

  return [];
};

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
      </StyledOrderedList>
    ) : (
      <StyledList
        className={this.props.className}
        styles={[
          this.context.styles.components.list,
          getStyles.call(this),
          this.props.style,
          getBulletStyle(this.props.bulletStyle, false)
        ]}
      >
        {this.props.children}
      </StyledList>
    );
  }
}

List.propTypes = {
  bulletStyle: PropTypes.string,
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
