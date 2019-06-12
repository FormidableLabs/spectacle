import React from 'react';
import PropTypes from 'prop-types';
import Clock from './clock';
import Timer from './timer';
import { TimeContainer } from './time-components';
export default function Time(_ref) {
  var timer = _ref.timer;
  return React.createElement(TimeContainer, null, timer ? React.createElement(Timer, null) : React.createElement(Clock, null));
}
Time.propTypes = {
  timer: PropTypes.bool
};