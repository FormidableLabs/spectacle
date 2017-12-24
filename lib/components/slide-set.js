'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideSet = function (_Component) {
  (0, _inherits3.default)(SlideSet, _Component);

  function SlideSet() {
    (0, _classCallCheck3.default)(this, SlideSet);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  SlideSet.prototype.render = function render() {
    return (0, _jsx3.default)('div', {}, void 0, this.props.children);
  };

  return SlideSet;
}(_react.Component);

SlideSet.defaultProps = {
  hasSlideChildren: true
};

SlideSet.contextTypes = {
  store: _propTypes2.default.object
};

exports.default = SlideSet;