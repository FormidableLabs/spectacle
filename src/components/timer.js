import React, {
    Component,
    PropTypes
} from "react";

import {
	Clock as TimerHeader, TButtonContainer, TSingleButton,
	TDoubleButton
} from "./time-components";

const timeCounter = (time) => {
	let hours = Math.floor(time/3600);
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;

	let areHours = hours > 0;

	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;
  	seconds = seconds < 10 ? `0${seconds}` : seconds;

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
    	// this.stopTimer();
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

    _renderResetButton() {
    	return (
    		<TSingleButton
			onClick={this.resetTimer}>
				Reset
			</TSingleButton>
		);
    }
    _renderStartButton() {
    	return (
			<TSingleButton
			onClick={this.startTimer}
			start>
				Start
			</TSingleButton>
		);
    }

    _renderStopButton() {
    	return (
    		<TSingleButton
			onClick={this.stopTimer}
			stop>
				Stop
			</TSingleButton>
    	);
    }

    render() {
        return (
        	<div>
	        	<TimerHeader>{timeCounter(this.state.elapsedTime)}</TimerHeader>
	        	<TButtonContainer>
		        	{(this.state.elapsedTime !== 0 && this.state.paused) ? (
		        		this._renderResetButton() 
		        		): null}
	        		{this.state.paused ? 	(this._renderStartButton()) : 
	        								(this._renderStopButton())
	        		}
        		</TButtonContainer>        	
        	</div>
        );
    }
}