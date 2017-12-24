'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _magicWrapper = require('./magic-wrapper');

var _magicWrapper2 = _interopRequireDefault(_magicWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Magic = function (_Component) {
  (0, _inherits3.default)(Magic, _Component);

  function Magic() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Magic);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.subscription = null, _this.routerCallback = function (callback) {
      setTimeout(function () {
        return callback();
      }, 490);
    }, _this.exitSubscriber = function (subscription) {
      _this.exitSubscription = subscription;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Magic.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return this.props.magicIndex !== nextProps.magicIndex;
  };

  Magic.prototype.componentWillLeave = function componentWillLeave(callback) {
    this.exitSubscription();
    this.routerCallback(callback);
  };

  Magic.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        transition = _props.transition,
        transitionDuration = _props.transitionDuration,
        props = (0, _objectWithoutProperties3.default)(_props, ['children', 'transition', 'transitionDuration']); // eslint-disable-line no-unused-vars

    return (0, _jsx3.default)(_magicWrapper2.default, {
      magicIndex: this.props.magicIndex,
      exitSubscription: this.exitSubscriber,
      presenter: props.presenter
    }, void 0, (0, _react.cloneElement)(this.props.children[this.props.magicIndex], props) || null);
  };

  return Magic;
}(_react.Component);

exports.default = Magic;


Magic.defaultProps = {
  magicIndex: 0
};