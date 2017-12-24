'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _timeComponents = require('./time-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var timeCounter = function timeCounter(time) {
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  var areHours = hours > 0;

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  var noHrTime = minutes + ' : ' + seconds;
  var hrTime = hours + ' : ' + noHrTime;

  return areHours ? hrTime : noHrTime;
};

var Timer = function (_Component) {
  (0, _inherits3.default)(Timer, _Component);

  function Timer() {
    (0, _classCallCheck3.default)(this, Timer);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

    _this.state = {
      elapsedTime: 0,
      paused: true
    };
    _this.handleStartTimer = _this.handleStartTimer.bind(_this);
    _this.handleStopTimer = _this.handleStopTimer.bind(_this);
    _this.handleResetTimer = _this.handleResetTimer.bind(_this);
    return _this;
  }

  Timer.prototype.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.interval);
  };

  Timer.prototype.handleStartTimer = function handleStartTimer() {
    var _this2 = this;

    this.setState({
      paused: false
    });
    this.interval = setInterval(function () {
      _this2.setState({
        elapsedTime: _this2.state.elapsedTime + 1
      });
    }, 1000);
  };

  Timer.prototype.handleStopTimer = function handleStopTimer() {
    this.setState({
      paused: true
    });
    clearInterval(this.interval);
  };

  Timer.prototype.handleResetTimer = function handleResetTimer() {
    this.handleStopTimer();
    this.setState({
      elapsedTime: 0
    });
  };

  Timer.prototype._renderResetButton = function _renderResetButton() {
    return (0, _jsx3.default)(_timeComponents.TSingleButton, {
      onClick: this.handleResetTimer
    }, void 0, 'Reset');
  };

  Timer.prototype._renderStartButton = function _renderStartButton() {
    return (0, _jsx3.default)(_timeComponents.TSingleButton, {
      onClick: this.handleStartTimer,
      start: true
    }, void 0, 'Start');
  };

  Timer.prototype._renderStopButton = function _renderStopButton() {
    return (0, _jsx3.default)(_timeComponents.TSingleButton, {
      onClick: this.handleStopTimer,
      stop: true
    }, void 0, 'Stop');
  };

  Timer.prototype.render = function render() {
    return (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(_timeComponents.Clock, {}, void 0, timeCounter(this.state.elapsedTime)), (0, _jsx3.default)(_timeComponents.TButtonContainer, {}, void 0, this.state.elapsedTime !== 0 && this.state.paused ? this._renderResetButton() : null, this.state.paused ? this._renderStartButton() : this._renderStopButton()));
  };

  return Timer;
}(_react.Component);

exports.default = Timer;