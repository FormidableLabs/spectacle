import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MagicWrapper from './magic-wrapper';

export default class Magic extends Component {
  render() {
    return (
      <MagicWrapper>
        {this.props.children[this.props.magicIndex] || null}
      </MagicWrapper>
    );
  }
}

Magic.propTypes = {
  children: PropTypes.node,
  magicIndex: PropTypes.number,
};

Magic.defaultProps = {
  magicIndex: 0,
};
