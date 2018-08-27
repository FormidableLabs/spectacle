import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Clock from './clock';
import Timer from './timer';
import { TimeContainer } from './time-components';

export default class Time extends Component {
  constructor() {
    super(...arguments);
    this.state = { timer: false };
  }
  _renderClock() {
    if (this.state.timer) {
      return <Timer />;
    } else {
      return <Clock />;
    }
  }
  render() {
    return (
      <TimeContainer>{this.props.timer ? <Timer /> : <Clock />}</TimeContainer>
    );
  }
}
Time.propTypes = {
  timer: PropTypes.bool
};
