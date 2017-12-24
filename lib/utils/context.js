'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Context = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Context, _Component);

  function Context() {
    (0, _classCallCheck3.default)(this, Context);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Context.prototype.getChildContext = function getChildContext() {
    var _props = this.props,
        history = _props.history,
        styles = _props.styles,
        store = _props.store;

    return {
      history: history,
      styles: styles,
      store: store
    };
  };

  Context.prototype.render = function render() {
    return this.props.children;
  };

  return Context;
}(_react.Component), _class.displayName = 'Context', _class.childContextTypes = {
  styles: _propTypes2.default.object,
  history: _propTypes2.default.object,
  store: _propTypes2.default.object
}, _temp);
exports.default = Context;