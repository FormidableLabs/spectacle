import React, {
    Component,
    PropTypes
} from "react";

import {Clock as TimerHeader} from "./presenter-components";

const timeCounter = (time) => {
	let hours = Math.floor(time/3600);
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;

	let areHours = hours > 0;

	hours = hours < 10 ? `0 ${hours}` : hours;
	minutes = minutes < 10 ? `0 ${minutes}` : minutes;
  	seconds = seconds < 10 ? `0 ${seconds}` : seconds;

  	const noHrTime = `${minutes} : ${seconds}`;
  	const hrTime = `${hours} : ${noHrTime}`

	return areHours ? hrTime : noHrTime;
}


export default class Timer extends Component {

	state = {
		elapsedTime: 0,
		paused: true
	};
    componentDidMount() {
    	this.startTimer();
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    startTimer = () => {
    	this.setState({
    		paused: false
    	});
    	this.interval = setInterval(() => {
			this.setState({
				elapsedTime: this.state.elapsedTime + 1,
			});
		}, 1000);
    };

    stopTimer = () => {
    	this.setState({
    		paused: true
    	});
    	clearInterval(this.interval);
    };

    resetTimer = () => {
    	this.stopTimer();
    	this.setState({
    		elapsedTime: 0,
    	});
    };

    render() {
        return (
        	<div>
	        	<TimerHeader>{timeCounter(this.state.elapsedTime)}</TimerHeader>
	        	{this.state.paused ? (
	        		<div>
		        		<button
			        	onClick={this.startTimer}>
			        		Start
			        	</button>
		        		<button
			        	onClick={this.resetTimer}>
			        		Reset
			        	</button>
			        </div>
	        	) : (
	        		<button
		        	onClick={this.stopTimer}>
		        		Stop
		        	</button>
	        	)}
        	</div>
        );
    }
}