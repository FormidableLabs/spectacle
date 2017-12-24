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

var _base = require('../utils/base');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledTable = /*#__PURE__*/(0, _reactEmotion2.default)('table')(function (props) {
  return props.styles;
});

var Table = function (_Component) {
  (0, _inherits3.default)(Table, _Component);

  function Table() {
    (0, _classCallCheck3.default)(this, Table);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Table.prototype.render = function render() {
    return (0, _jsx3.default)(StyledTable, {
      className: this.props.className,
      styles: [this.context.styles.components.table, _base.getStyles.call(this), this.props.style]
    }, void 0, this.props.children);
  };

  return Table;
}(_react.Component);

exports.default = Table;


Table.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object
};