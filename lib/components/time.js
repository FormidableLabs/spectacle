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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _clock = require('./clock');

var _clock2 = _interopRequireDefault(_clock);

var _timer = require('./timer');

var _timer2 = _interopRequireDefault(_timer);

var _timeComponents = require('./time-components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (0, _jsx3.default)(_timer2.default, {});

var _ref2 = (0, _jsx3.default)(_clock2.default, {});

var _ref3 = (0, _jsx3.default)(_timer2.default, {});

var _ref4 = (0, _jsx3.default)(_clock2.default, {});

var Time = function (_Component) {
  (0, _inherits3.default)(Time, _Component);

  function Time() {
    (0, _classCallCheck3.default)(this, Time);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this));

    _this.state = { timer: false };
    return _this;
  }

  Time.prototype._renderClock = function _renderClock() {
    if (this.state.timer) {
      return _ref;
    } else {
      return _ref2;
    }
  };

  Time.prototype.render = function render() {
    return (0, _jsx3.default)(_timeComponents.TimeContainer, {}, void 0, this.props.timer ? _ref3 : _ref4);
  };

  return Time;
}(_react.Component);

exports.default = Time;