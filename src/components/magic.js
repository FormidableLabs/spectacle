import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';

import MagicWrapper from './magic-wrapper';

export default class Magic extends Component {
  subscription = null;

  shouldComponentUpdate(nextProps) {
    return this.props.magicIndex !== nextProps.magicIndex;
  }

  componentWillLeave(callback) {
    this.exitSubscription();
    this.routerCallback(callback);
  }

  routerCallback = callback => {
    setTimeout(() => callback(), 490);
  };

  exitSubscriber = subscription => {
    this.exitSubscription = subscription;
  };

  render() {
    return (
      <MagicWrapper
        magicIndex={this.props.magicIndex}
        exitSubscription={this.exitSubscriber}
      >
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
