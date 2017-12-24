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

var _base = require('../utils/base');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoToActionButton = /*#__PURE__*/(0, _reactEmotion2.default)('button')(function (_ref) {
  var styles = _ref.styles;
  return [styles.context, styles.base, styles.user];
});

var _ref2 = (0, _jsx3.default)('div', {});

var GoToAction = function (_React$Component) {
  (0, _inherits3.default)(GoToAction, _React$Component);

  function GoToAction() {
    (0, _classCallCheck3.default)(this, GoToAction);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  GoToAction.prototype.render = function render() {
    var _props = this.props,
        render = _props.render,
        children = _props.children,
        style = _props.style,
        slide = _props.slide,
        goToSlide = this.context.goToSlide;

    if (render && (0, _isFunction2.default)(render)) {
      return render(goToSlide);
    } else if (slide) {
      return (0, _jsx3.default)(GoToActionButton, {
        onClick: function onClick() {
          return goToSlide(slide);
        },
        styles: {
          context: this.context.styles.components.goToAction,
          base: _base.getStyles.call(this),
          user: style
        }
      }, void 0, children);
    }
    // eslint-disable-next-line no-console
    console.warn('<GoToAction /> must have a render or slide prop.');
    return _ref2;
  };

  return GoToAction;
}(_react2.default.Component);

GoToAction.contextTypes = {
  styles: _propTypes2.default.object,
  goToSlide: _propTypes2.default.func
};

exports.default = GoToAction;