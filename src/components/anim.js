/* eslint-disable react/no-did-mount-set-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findKey from 'lodash/findKey';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { VictoryAnimation } from 'victory-core';
import { victoryEases } from '../utils/types';

class Anim extends Component {
  state = {
    activeAnimation: -1
  };

  componentDidMount() {
    const shouldDisableAnimation =
      this.props.route.params.indexOf('export') !== -1 ||
      this.props.route.params.indexOf('overview') !== -1 ||
      this.props.route.params.indexOf('notes') !== -1;

    if (shouldDisableAnimation) {
      this.setState({ activeAnimation: this.props.toStyle.length - 1 });
      return;
    }

    const order = this.props.order;
    const node = findDOMNode(this.fragmentRef);
    if (!node.dataset) {
      node.dataset = {};
    }
    node.dataset.order = order;
    node.dataset.animCount = this.props.toStyle.length;
  }

  componentDidUpdate(prevProps, prevState) {
    const shouldDisableAnimation =
      this.props.route.params.indexOf('export') !== -1 ||
      this.props.route.params.indexOf('overview') !== -1 ||
      this.props.route.params.indexOf('notes') !== -1;

    if (shouldDisableAnimation) {
      this.disableAnimation();
    }

    const animationStatus = this.getAnimationStatus();
    if (animationStatus) {
      const nextAnimation = animationStatus.every(a => a === true)
        ? animationStatus.length - 1
        : animationStatus.indexOf(false) - 1;
      if (prevState.activeAnimation !== nextAnimation) {
        const state = this.props.fragment;
        const { slide } = prevProps.route;
        this.context.stepCounter.setFragments(state.fragments[slide], slide);
        if (prevProps.onAnim) {
          const forward = prevState.activeAnimation < nextAnimation;
          prevProps.onAnim(forward, nextAnimation);
        }
        this.updateAnimation(nextAnimation);
      }
    }
  }

  disableAnimation = () => {
    if (this.state.activeAnimation !== this.props.toStyle.length - 1) {
      this.setState({ activeAnimation: this.props.toStyle.length - 1 });
    }

    return;
  };

  updateAnimation = nextAnimation => {
    if (this.state.activeAnimation !== nextAnimation) {
      this.setState({
        activeAnimation: nextAnimation
      });
    }

    return;
  };

  getAnimationStatus() {
    const state = this.props.fragment;
    const { slide } = this.props.route;
    const fragment = findDOMNode(this.fragmentRef);
    const key = findKey(state.fragments[slide], {
      id: `${this.context.slideHash}-${parseInt(fragment.dataset.fid, 10)}`
    });
    if (
      slide in state.fragments &&
      state.fragments[slide].hasOwnProperty(key)
    ) {
      return state.fragments[slide][key].animations;
    }
    return null;
  }

  render() {
    const {
      children,
      fromStyle,
      toStyle,
      transitionDuration,
      easing,
      style
    } = this.props;
    const child = React.Children.only(children);
    const tweenData =
      this.state.activeAnimation === -1
        ? fromStyle
        : toStyle[this.state.activeAnimation];
    return (
      <VictoryAnimation
        data={tweenData}
        duration={transitionDuration}
        easing={easing}
      >
        {tweenStyle =>
          React.cloneElement(child, {
            className: `fragment ${child.props.className}`.trim(),
            style: { ...child.props.style, ...style, ...tweenStyle },
            ref: f => {
              this.fragmentRef = f;
            }
          })
        }
      </VictoryAnimation>
    );
  }
}

Anim.defaultProps = {
  order: 0
};

Anim.propTypes = {
  children: PropTypes.node,
  easing: PropTypes.oneOf(victoryEases).isRequired,
  fragment: PropTypes.object,
  fromStyle: PropTypes.object.isRequired,
  onAnim: PropTypes.func,
  order: PropTypes.number,
  route: PropTypes.object,
  style: PropTypes.object,
  toStyle: PropTypes.arrayOf(PropTypes.object).isRequired,
  transitionDuration: PropTypes.number.isRequired
};

Anim.contextTypes = {
  export: PropTypes.bool,
  overview: PropTypes.bool,
  slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  slideHash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stepCounter: PropTypes.shape({
    setFragments: PropTypes.func
  })
};

export default connect(state => state)(Anim);
