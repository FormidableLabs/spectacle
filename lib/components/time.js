"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Time;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clock = _interopRequireDefault(require("./clock"));

var _timer = _interopRequireDefault(require("./timer"));

var _timeComponents = require("./time-components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Time(_ref) {
  var timer = _ref.timer;
  return _react.default.createElement(_timeComponents.TimeContainer, null, timer ? _react.default.createElement(_timer.default, null) : _react.default.createElement(_clock.default, null));
}

Time.propTypes = {
  timer: _propTypes.default.bool
};