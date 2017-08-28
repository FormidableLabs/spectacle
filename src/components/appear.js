import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import findKey from 'lodash/findKey';
import { connect } from 'react-redux';
import { VictoryAnimation } from 'victory-core';

class Appear extends Component {
  state = {
    active: false,
  };

  componentWillReceiveProps(nextProps) {
    const state = nextProps.fragment;
    const slide = this.props.route.slide;
    const fragment = findDOMNode(this.fragmentRef);
    const key = findKey(state.fragments[slide], {
      id: parseInt(fragment.dataset.fid),
    });

    const shouldDisableAnimation =
      this.props.route.params.indexOf('export') !== -1 ||
      this.props.route.params.indexOf('overview') !== -1;

    if (shouldDisableAnimation) {
      this.setState({ active: true });
      return;
    }

    if (
      slide in state.fragments &&
      state.fragments[slide].hasOwnProperty(key)
    ) {
      const active = state.fragments[slide][key].visible;
      this.setState({ active });
    }
  }

  render() {
    const child = React.Children.only(this.props.children);
    const endValue = this.state.active ? 1 : 0;
    const transitionDuration = this.props.transitionDuration;

    return (
      <VictoryAnimation
        data={{ opacity: endValue }}
        duration={transitionDuration}
        easing="quadInOut"
      >
        {({ opacity }) =>
          React.cloneElement(child, {
            className: 'fragment',
            style: { ...child.props.style, opacity },
            ref: f => {
              this.fragmentRef = f;
            },
          })}
      </VictoryAnimation>
    );
  }
}

Appear.defaultProps = {
  transitionDuration: 300
};

Appear.propTypes = {
  children: PropTypes.node,
  fragment: PropTypes.object,
  route: PropTypes.object,
  style: PropTypes.object,
  transitionDuration: PropTypes.number
};

Appear.contextTypes = {
  export: PropTypes.bool,
  overview: PropTypes.bool,
  slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default connect(state => state)(Appear);
