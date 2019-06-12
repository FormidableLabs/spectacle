"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _base = require("../utils/base");

var _slideComponents = require("./slide-components");

var _stepCounter = _interopRequireDefault(require("../utils/step-counter"));

var _actions = require("../actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Slide =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Slide, _React$PureComponent);

  function Slide() {
    var _this;

    _classCallCheck(this, Slide);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slide).apply(this, arguments));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      reverse: false,
      transitioning: true,
      z: 1
    });

    _this.stepCounter = (0, _stepCounter.default)();
    return _this;
  }

  _createClass(Slide, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        stepCounter: {
          setFragments: this.stepCounter.setFragments
        },
        slideHash: this.props.hash
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var slide = this.slideRef;
      var frags = slide.querySelectorAll('.fragment');
      var currentOrder = 0;

      if (frags && frags.length && !this.context.overview) {
        Array.prototype.slice.call(frags, 0).sort(function (lhs, rhs) {
          return parseInt(lhs.dataset.order, 10) - parseInt(rhs.dataset.order, 10);
        }).forEach(function (frag) {
          frag.dataset.fid = currentOrder;

          if (_this2.props.dispatch) {
            _this2.props.dispatch((0, _actions.addFragment)({
              className: frag.className || '',
              slide: _this2.props.hash,
              id: "".concat(_this2.props.hash, "-").concat(currentOrder),
              animations: Array.from({
                length: frag.dataset.animCount
              }).fill(_this2.props.lastSlideIndex > _this2.props.slideIndex)
            }));
          }

          currentOrder += 1;
        });
      }

      this.context.onStateChange(this.props.state);

      if ((0, _isFunction.default)(this.props.onActive)) {
        this.props.onActive(this.props.slideIndex);
      }

      if (this.props.getAppearStep) {
        /* eslint-disable no-console */
        console.warn('getAppearStep has been deprecated, use getAnimStep instead');
        /* eslint-enable */
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$stepCounter$get = this.stepCounter.getSteps(),
          steps = _this$stepCounter$get.steps,
          slideIndex = _this$stepCounter$get.slideIndex;

      var stepFunc = this.props.getAnimStep || this.props.getAppearStep;

      if (stepFunc) {
        if (slideIndex === this.props.slideIndex) {
          stepFunc(steps);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          presenterStyle = _this$props.presenterStyle,
          children = _this$props.children;
      var contentClass = (0, _isUndefined.default)(this.props.className) ? '' : this.props.className;
      return _react.default.createElement(_slideComponents.SlideContainer, {
        className: "spectacle-slide",
        innerRef: function innerRef(s) {
          _this3.slideRef = s;
        },
        exportMode: this.props.export,
        printMode: this.props.print,
        background: this.context.styles.global.body.background,
        style: this.props.style,
        styles: {
          base: _base.getStyles.call(this),
          presenter: presenterStyle
        }
      }, _react.default.createElement(_slideComponents.SlideContentWrapper, {
        align: this.props.align,
        overviewMode: this.context.overview
      }, _react.default.createElement(_slideComponents.SlideContent, {
        innerRef: function innerRef(c) {
          _this3.contentRef = c;
        },
        className: "".concat(contentClass, " spectacle-content"),
        overviewMode: this.context.overview,
        width: this.context.contentWidth,
        height: this.context.contentHeight,
        margin: this.props.margin,
        style: _objectSpread({}, this.props.contentStyles || {}),
        styles: {
          context: this.context.styles.components.content
        }
      }, children)));
    }
  }]);

  return Slide;
}(_react.default.PureComponent);

Slide.defaultProps = {
  align: 'center center',
  presenterStyle: {},
  style: {},
  viewerScaleMode: false
};
Slide.propTypes = {
  align: _propTypes.default.string,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  contentStyles: _propTypes.default.object,
  dispatch: _propTypes.default.func,
  export: _propTypes.default.bool,
  getAnimStep: _propTypes.default.func,
  getAppearStep: _propTypes.default.func,
  hash: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  lastSlideIndex: _propTypes.default.number,
  margin: _propTypes.default.number,
  notes: _propTypes.default.any,
  onActive: _propTypes.default.func,
  presenterStyle: _propTypes.default.object,
  print: _propTypes.default.bool,
  slideIndex: _propTypes.default.number,
  slideReference: _propTypes.default.array,
  state: _propTypes.default.string,
  style: _propTypes.default.object,
  transition: _propTypes.default.array,
  transitionDuration: _propTypes.default.number,
  transitionIn: _propTypes.default.array,
  transitionOut: _propTypes.default.array,
  viewerScaleMode: _propTypes.default.bool
};
Slide.contextTypes = {
  contentHeight: _propTypes.default.number,
  contentWidth: _propTypes.default.number,
  export: _propTypes.default.bool,
  onStateChange: _propTypes.default.func.isRequired,
  overview: _propTypes.default.bool,
  print: _propTypes.default.object,
  store: _propTypes.default.object,
  styles: _propTypes.default.object
};
Slide.childContextTypes = {
  slideHash: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  stepCounter: _propTypes.default.shape({
    setFragments: _propTypes.default.func
  })
};
var _default = Slide;
exports.default = _default;