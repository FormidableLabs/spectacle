import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Magic extends Component {
  componentDidMount() {
    console.log('mount')
  }
  componentWillReceiveProps() {
    console.log('props')
  }
  render() {
    return this.props.children[this.props.magicIndex] || null;
  }
}

Magic.propTypes = {
  children: PropTypes.node,
  magicIndex: PropTypes.number
};

Magic.defaultProps = {
  magicIndex: 0
};
