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

var startTime = function startTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  var strTime = hours + ' : ' + minutes + ' : ' + seconds + ' ' + ampm;
  return strTime;
};

var Clock = function (_Component) {
  (0, _inherits3.default)(Clock, _Component);

  function Clock() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Clock);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { time: new Date(Date.now()) }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Clock.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    this.interval = setInterval(function () {
      _this2.setState({
        time: new Date()
      });
    }, 1000);
  };

  Clock.prototype.componentWillUnmount = function componentWillUnmount() {
    clearInterval(this.interval);
  };

  Clock.prototype.render = function render() {
    return (0, _jsx3.default)(_timeComponents.Clock, {}, void 0, startTime(this.state.time));
  };

  return Clock;
}(_react.Component);

exports.default = Clock;