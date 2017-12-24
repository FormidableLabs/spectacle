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

var Pacman = {
  Base: /*#__PURE__*/(0, _reactEmotion2.default)('div')(function (_ref) {
    var styles = _ref.styles,
        position = _ref.position;
    return [styles, position];
  }),
  Body: /*#__PURE__*/(0, _reactEmotion2.default)('div')(function (props) {
    return props.styles;
  })
};

// NOTE: rotateZ is 0.1 to generate two different animation names (emotion deduplication)
var pacmanTopFrames = /*#__PURE__*/(0, _reactEmotion.keyframes)('0%{transform:rotateZ(0.1deg)}100%{transform:rotateZ(-30deg)}');

// NOTE: rotateZ is 0.1 to generate two different animation names (emotion deduplication)
var pacmanBottomFrames = /*#__PURE__*/(0, _reactEmotion.keyframes)('0%{transform:rotateZ(0.1deg)}100%{transform:rotateZ(30deg)}');

var pacmanTopFramesBis = /*#__PURE__*/(0, _reactEmotion.keyframes)('0%{transform:rotateZ(0deg)}100%{transform:rotateZ(-30deg)}');

var pacmanBottomFramesBis = /*#__PURE__*/(0, _reactEmotion.keyframes)('0%{transform:rotateZ(0deg)}100%{transform:rotateZ(30deg)}');

var Point = /*#__PURE__*/(0, _reactEmotion2.default)('div')(function (_ref2) {
  var styles = _ref2.styles,
      position = _ref2.position;
  return [styles, position];
});
var Bar = /*#__PURE__*/(0, _reactEmotion2.default)('div')(function (_ref3) {
  var styles = _ref3.styles,
      width = _ref3.width;
  return [styles, width];
});
var Container = /*#__PURE__*/(0, _reactEmotion2.default)('div')(function (props) {
  return props.styles;
});

var Progress = function (_Component) {
  (0, _inherits3.default)(Progress, _Component);

  function Progress() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Progress);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.resolveProgressStyles = function (field) {
      var progressColor = _this.props.progressColor;


      if (!_this.props.progressColor) {
        return null;
      }

      var style = {};
      var color = void 0;

      if (!_this.context.styles.colors.hasOwnProperty(progressColor)) {
        color = progressColor;
      } else {
        color = _this.context.styles.colors[progressColor];
      }

      style[field] = color;

      return style;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Progress.prototype.getWidth = function getWidth() {
    return {
      width: 100 * this.props.currentSlideIndex / (this.props.items.length - 1) + '%'
    };
  };

  Progress.prototype.getPacmanStyle = function getPacmanStyle(side) {
    var isBis = this.props.currentSlideIndex % 2 !== 0;
    var animationName = void 0;

    if (side === 'top') {
      animationName = isBis ? pacmanTopFramesBis : pacmanTopFrames;
    } else {
      animationName = isBis ? pacmanBottomFramesBis : pacmanBottomFrames;
    }

    return {
      animation: animationName + ' 0.12s linear 10 alternate both'
    };
  };

  Progress.prototype.getPointPosition = function getPointPosition(i) {
    return {
      top: '-20px',
      left: 5 + 20 * (i - this.props.items.length / 2) + 'px'
    };
  };

  Progress.prototype.getPointStyle = function getPointStyle(i) {
    var style = this.getPointPosition(i);
    if (this.props.currentSlideIndex >= i) {
      style.opacity = 0;
    }

    return style;
  };

  Progress.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        type = _props.type,
        currentSlideIndex = _props.currentSlideIndex,
        items = _props.items;

    var style = this.context.styles.progress;
    var markup = void 0;
    switch (type) {
      case 'none':
        return false;
      case 'pacman':
        style = style.pacman;
        markup = (0, _jsx3.default)('div', {}, void 0, (0, _jsx3.default)(Pacman.Base, {
          styles: style.pacman,
          position: this.getPointPosition(currentSlideIndex)
        }, void 0, (0, _jsx3.default)(Pacman.Body, {
          styles: [style.pacmanTop, this.getPacmanStyle('top'), this.resolveProgressStyles('background')]
        }), (0, _jsx3.default)(Pacman.Body, {
          styles: [style.pacmanBottom, this.getPacmanStyle('bottom'), this.resolveProgressStyles('background')]
        })), items.map(function (item, i) {
          return (0, _jsx3.default)(Point, {
            styles: [style.point, _this2.resolveProgressStyles('borderColor')],
            position: _this2.getPointStyle(i)
          }, 'presentation-progress-' + i);
        }));
        break;
      case 'number':
        style = style.number;
        markup = (0, _jsx3.default)('div', {}, void 0, currentSlideIndex + 1, ' / ', items.length);
        break;
      case 'bar':
        style = style.bar;
        markup = (0, _jsx3.default)(Bar, {
          styles: [style.bar, this.resolveProgressStyles('background')],
          width: this.getWidth()
        });
        break;
      default:
        return false;
    }
    return (0, _jsx3.default)(Container, {
      styles: [style.container, this.resolveProgressStyles('color')]
    }, void 0, markup);
  };

  return Progress;
}(_react.Component);

exports.default = Progress;


Progress.contextTypes = {
  styles: _propTypes2.default.object
};