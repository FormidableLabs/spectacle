import React from 'react';
import PropTypes from 'prop-types';
import Clock from './clock';
import Timer from './timer';
import { TimeContainer } from './time-components';

export default function Time({ timer }) {
  return <TimeContainer>{timer ? <Timer /> : <Clock />}</TimeContainer>;
}

Time.propTypes = {
  timer: PropTypes.bool
};
