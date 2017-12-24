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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

var _controller = require('../utils/controller');

var _controller2 = _interopRequireDefault(_controller);

var _manager = require('./manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _store2.default)();

var Deck = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Deck, _Component);

  function Deck() {
    (0, _classCallCheck3.default)(this, Deck);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Deck.prototype.render = function render() {
    return (0, _jsx3.default)(_reactRedux.Provider, {
      store: store
    }, void 0, (0, _jsx3.default)(_controller2.default, {
      theme: this.props.theme,
      store: store,
      history: this.props.history
    }, void 0, _react2.default.createElement(
      _manager2.default,
      this.props,
      this.props.children
    )));
  };

  return Deck;
}(_react.Component), _class.displayName = 'Deck', _temp);
exports.default = Deck;