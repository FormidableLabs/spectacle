import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Anim from './anim';
import { victoryEases } from '../utils/types';

class Appear extends Component {
  render() {
    const {
      transitionDuration,
      startValue,
      endValue,
      easing,
      style
    } = this.props;
    return (
      <Anim
        {...this.props}
        transitionDuration={transitionDuration}
        fromStyle={startValue}
        toStyle={[endValue]}
        easing={easing}
        style={style}
      >
        {this.props.children}
      </Anim>
    );
  }
}

Appear.defaultProps = {
  transitionDuration: 300,
  startValue: { opacity: 0 },
  endValue: { opacity: 1 },
  easing: 'quadInOut'
};

Appear.propTypes = {
  children: PropTypes.node,
  easing: PropTypes.oneOf(victoryEases),
  endValue: PropTypes.object,
  fragment: PropTypes.object,
  order: PropTypes.number,
  startValue: PropTypes.object,
  style: PropTypes.object,
  transitionDuration: PropTypes.number
};

export default Appear;
