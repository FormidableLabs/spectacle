import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';

import MagicWrapper from './magic-wrapper';

export default class Magic extends Component {
  constructor() {
    super(...arguments);
    this.routerCallback = this.routerCallback.bind(this);
    this.exitSubscriber = this.exitSubscriber.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.magicIndex !== nextProps.magicIndex;
  }

  componentWillLeave(callback) {
    this.exitSubscription();
    this.routerCallback(callback);
  }

  routerCallback(callback) {
    setTimeout(() => callback(), 490);
  }

  exitSubscriber(subscription) {
    this.exitSubscription = subscription;
  }

  render() {
    const { children, transition, transitionDuration, ...props } = this.props; // eslint-disable-line no-unused-vars
    return (
      <MagicWrapper
        magicIndex={this.props.magicIndex}
        exitSubscription={this.exitSubscriber}
        presenter={props.presenter}
      >
        {cloneElement(this.props.children[this.props.magicIndex], props) ||
          null}
      </MagicWrapper>
    );
  }
}

Magic.propTypes = {
  children: PropTypes.node,
  magicIndex: PropTypes.number,
  transition: PropTypes.array,
  transitionDuration: PropTypes.number
};

Magic.defaultProps = {
  magicIndex: 0
};
