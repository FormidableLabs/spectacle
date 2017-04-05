import React, {
    Component,
    PropTypes
} from "react";

import Clock from "./clock";
import Timer from "./timer";

import {TimeContainer} from "./time-components";

export default class Time extends Component {

	state = {
		timer: false
	};

	componentWillMount() {

	}
	componentWillUnmount() {

	}
	_renderClock() {
	    if (this.state.timer)
	      return <Timer/>
	    else
	      return <Clock/>
	}
	render() {
		return (
			<TimeContainer>
				{this.props.timer ? (<Timer/>) : <Clock/>}
			</TimeContainer>
		);
	}
}

Time.propTypes = {
  timer: PropTypes.bool,
}