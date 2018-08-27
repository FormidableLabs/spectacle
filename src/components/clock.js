import React, { Component } from 'react';
import { Clock as ClockStyle } from './time-components';

const startTime = function startTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  const strTime = `${hours} : ${minutes} : ${seconds} ${ampm}`;
  return strTime;
};

export default class Clock extends Component {
  state = {
    time: new Date(Date.now())
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        time: new Date()
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <ClockStyle>{startTime(this.state.time)}</ClockStyle>;
  }
}
