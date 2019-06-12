"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactEmotion = _interopRequireWildcard(require("react-emotion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Pacman = {
  Base:
  /*#__PURE__*/
  (0, _reactEmotion.default)("div", {
    target: "e12weced0"
  })(function (_ref) {
    var styles = _ref.styles,
        position = _ref.position;
    return [styles, position];
  }),
  Body:
  /*#__PURE__*/
  (0, _reactEmotion.default)("div", {
    target: "e12weced1"
  })(function (props) {
    return props.styles;
  })
}; // NOTE: rotateZ is 0.1 to generate two different animation names (emotion deduplication)

var pacmanTopFrames =
/*#__PURE__*/
(0, _reactEmotion.keyframes)("0%{transform:rotateZ(0.1deg)}100%{transform:rotateZ(-30deg)}"); // NOTE: rotateZ is 0.1 to generate two different animation names (emotion deduplication)

var pacmanBottomFrames =
/*#__PURE__*/
(0, _reactEmotion.keyframes)("0%{transform:rotateZ(0.1deg)}100%{transform:rotateZ(30deg)}");
var pacmanTopFramesBis =
/*#__PURE__*/
(0, _reactEmotion.keyframes)("0%{transform:rotateZ(0deg)}100%{transform:rotateZ(-30deg)}");
var pacmanBottomFramesBis =
/*#__PURE__*/
(0, _reactEmotion.keyframes)("0%{transform:rotateZ(0deg)}100%{transform:rotateZ(30deg)}");
var Point =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e12weced2"
})(function (_ref2) {
  var styles = _ref2.styles,
      position = _ref2.position;
  return [styles, position];
});
var Bar =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e12weced3"
})(function (_ref3) {
  var styles = _ref3.styles,
      width = _ref3.width;
  return [styles, width];
});
var Container =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e12weced4"
})(function (props) {
  return props.styles;
});

var Progress =
/*#__PURE__*/
function (_Component) {
  _inherits(Progress, _Component);

  function Progress() {
    var _this;

    _classCallCheck(this, Progress);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Progress).apply(this, arguments));
    _this.resolveProgressStyles = _this.resolveProgressStyles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Progress, [{
    key: "resolveProgressStyles",
    value: function resolveProgressStyles(field) {
      var progressColor = this.props.progressColor;

      if (!this.props.progressColor) {
        return null;
      }

      var style = {};
      var color;

      if (!this.context.styles.colors.hasOwnProperty(progressColor)) {
        color = progressColor;
      } else {
        color = this.context.styles.colors[progressColor];
      }

      style[field] = color;
      return style;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return {
        width: "".concat(100 * this.props.currentSlideIndex / (this.props.items.length - 1), "%")
      };
    }
  }, {
    key: "getPacmanStyle",
    value: function getPacmanStyle(side) {
      var isBis = this.props.currentSlideIndex % 2 !== 0;
      var animationName;

      if (side === 'top') {
        animationName = isBis ? pacmanTopFramesBis : pacmanTopFrames;
      } else {
        animationName = isBis ? pacmanBottomFramesBis : pacmanBottomFrames;
      }

      return {
        animation: "".concat(animationName, " 0.12s linear 10 alternate both")
      };
    }
  }, {
    key: "getPointPosition",
    value: function getPointPosition(i) {
      return {
        top: '-20px',
        left: "".concat(5 + 20 * (i - this.props.items.length / 2), "px")
      };
    }
  }, {
    key: "getPointStyle",
    value: function getPointStyle(i) {
      var style = this.getPointPosition(i);

      if (this.props.currentSlideIndex >= i) {
        style.opacity = 0;
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          type = _this$props.type,
          currentSlideIndex = _this$props.currentSlideIndex,
          items = _this$props.items;
      var style = this.context.styles.progress;
      var markup;

      switch (type) {
        case 'none':
          return false;

        case 'pacman':
          style = style.pacman;
          markup = _react.default.createElement("div", null, _react.default.createElement(Pacman.Base, {
            styles: style.pacman,
            position: this.getPointPosition(currentSlideIndex)
          }, _react.default.createElement(Pacman.Body, {
            styles: [style.pacmanTop, this.getPacmanStyle('top'), this.resolveProgressStyles('background')]
          }), _react.default.createElement(Pacman.Body, {
            styles: [style.pacmanBottom, this.getPacmanStyle('bottom'), this.resolveProgressStyles('background')]
          })), items.map(function (item, i) {
            return _react.default.createElement(Point, {
              styles: [style.point, _this2.resolveProgressStyles('borderColor')],
              position: _this2.getPointStyle(i),
              key: "presentation-progress-".concat(i)
            });
          }));
          break;

        case 'number':
          style = style.number;
          markup = _react.default.createElement("div", null, currentSlideIndex + 1, " / ", items.length);
          break;

        case 'bar':
          style = style.bar;
          markup = _react.default.createElement(Bar, {
            styles: [style.bar, this.resolveProgressStyles('background')],
            width: this.getWidth()
          });
          break;

        default:
          return false;
      }

      return _react.default.createElement(Container, {
        styles: [style.container, this.resolveProgressStyles('color')]
      }, markup);
    }
  }]);

  return Progress;
}(_react.Component);

exports.default = Progress;
Progress.propTypes = {
  currentSlideIndex: _propTypes.default.number,
  items: _propTypes.default.array,
  progressColor: _propTypes.default.string,
  type: _propTypes.default.oneOf(['pacman', 'bar', 'number', 'none'])
};
Progress.contextTypes = {
  styles: _propTypes.default.object
};