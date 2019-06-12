"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _timeComponents = require("./time-components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var timeCounter = function timeCounter(time) {
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  var areHours = hours > 0;
  hours = hours < 10 ? "0".concat(hours) : hours;
  minutes = minutes < 10 ? "0".concat(minutes) : minutes;
  seconds = seconds < 10 ? "0".concat(seconds) : seconds;
  var noHrTime = "".concat(minutes, " : ").concat(seconds);
  var hrTime = "".concat(hours, " : ").concat(noHrTime);
  return areHours ? hrTime : noHrTime;
};

var Timer =
/*#__PURE__*/
function (_Component) {
  _inherits(Timer, _Component);

  function Timer() {
    var _this;

    _classCallCheck(this, Timer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timer).apply(this, arguments));
    _this.handleStartTimer = _this.handleStartTimer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleStopTimer = _this.handleStopTimer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleResetTimer = _this.handleResetTimer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      elapsedTime: 0,
      paused: true
    };
    return _this;
  }

  _createClass(Timer, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "handleStartTimer",
    value: function handleStartTimer() {
      var _this2 = this;

      this.setState({
        paused: false
      });
      this.interval = setInterval(function () {
        _this2.setState({
          elapsedTime: _this2.state.elapsedTime + 1
        });
      }, 1000);
    }
  }, {
    key: "handleStopTimer",
    value: function handleStopTimer() {
      this.setState({
        paused: true
      });
      clearInterval(this.interval);
    }
  }, {
    key: "handleResetTimer",
    value: function handleResetTimer() {
      this.handleStopTimer();
      this.setState({
        elapsedTime: 0
      });
    }
  }, {
    key: "_renderResetButton",
    value: function _renderResetButton() {
      return _react.default.createElement(_timeComponents.TSingleButton, {
        onClick: this.handleResetTimer
      }, "Reset");
    }
  }, {
    key: "_renderStartButton",
    value: function _renderStartButton() {
      return _react.default.createElement(_timeComponents.TSingleButton, {
        onClick: this.handleStartTimer,
        start: true
      }, "Start");
    }
  }, {
    key: "_renderStopButton",
    value: function _renderStopButton() {
      return _react.default.createElement(_timeComponents.TSingleButton, {
        onClick: this.handleStopTimer,
        stop: true
      }, "Stop");
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", null, _react.default.createElement(_timeComponents.Clock, null, timeCounter(this.state.elapsedTime)), _react.default.createElement(_timeComponents.TButtonContainer, null, this.state.elapsedTime !== 0 && this.state.paused ? this._renderResetButton() : null, this.state.paused ? this._renderStartButton() : this._renderStopButton()));
    }
  }]);

  return Timer;
}(_react.Component);

exports.default = Timer;