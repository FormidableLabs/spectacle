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

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledButton = /*#__PURE__*/(0, _reactEmotion2.default)('button')(function (props) {
  return props.styles;
});

var _ref = (0, _jsx3.default)('path', {
  d: 'M512,97.707L414.293,0L0,414.293l414.293,414.293L512,730.88L195.414,414.293L512,97.707z'
});

var _ref2 = (0, _jsx3.default)('path', {
  d: 'M97.707,0L0,97.707l316.586,316.586L0,730.88l97.707,97.706L512,414.293L97.707,0z'
});

var Controls = function (_Component) {
  (0, _inherits3.default)(Controls, _Component);

  function Controls() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Controls);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.resolveFillStyle = function (name) {
      var color = void 0;
      var controlColor = _this.props.controlColor;

      if (controlColor) {
        if (!_this.context.styles.colors.hasOwnProperty(controlColor)) {
          color = controlColor;
        } else {
          color = _this.context.styles.colors[controlColor];
        }
        return {
          fill: color
        };
      }
      return _this.context.styles.controls[name];
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Controls.prototype.render = function render() {
    return (0, _jsx3.default)('div', {
      style: this.context.styles.controls.container
    }, void 0, this.props.currentSlideIndex !== 0 && (0, _jsx3.default)(StyledButton, {
      type: 'button',
      'aria-label': 'Previous slide',
      onClick: this.props.onPrev,
      style: this.context.styles.controls.prev
    }, 'prev', (0, _jsx3.default)('svg', {
      style: this.resolveFillStyle('prevIcon'),
      width: '32px',
      height: '32px',
      viewBox: '0 0 512 828.586',
      role: 'presentation',
      focusable: 'false'
    }, 'prevIcon', _ref)), this.props.currentSlideIndex < this.props.totalSlides - 1 && (0, _jsx3.default)(StyledButton, {
      type: 'button',
      'aria-label': 'Next slide',
      onClick: this.props.onNext,
      style: this.context.styles.controls.next
    }, 'next', (0, _jsx3.default)('svg', {
      style: this.resolveFillStyle('nextIcon'),
      width: '32px',
      height: '32px',
      viewBox: '0 0 512 828.586',
      role: 'presentation',
      focusable: 'false'
    }, 'nextIcon', _ref2)));
  };

  return Controls;
}(_react.Component);

exports.default = Controls;


Controls.contextTypes = {
  styles: _propTypes2.default.object
};