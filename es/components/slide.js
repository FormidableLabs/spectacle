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

/* eslint-disable no-invalid-this, max-statements */
import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import { getStyles } from '../utils/base';
import { SlideContent, SlideContainer, SlideContentWrapper } from './slide-components';
import stepCounter from '../utils/step-counter';
import { addFragment } from '../actions';

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

    _this.stepCounter = stepCounter();
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
            _this2.props.dispatch(addFragment({
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

      if (isFunction(this.props.onActive)) {
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
      var contentClass = isUndefined(this.props.className) ? '' : this.props.className;
      return React.createElement(SlideContainer, {
        className: "spectacle-slide",
        innerRef: function innerRef(s) {
          _this3.slideRef = s;
        },
        exportMode: this.props.export,
        printMode: this.props.print,
        background: this.context.styles.global.body.background,
        style: this.props.style,
        styles: {
          base: getStyles.call(this),
          presenter: presenterStyle
        }
      }, React.createElement(SlideContentWrapper, {
        align: this.props.align,
        overviewMode: this.context.overview
      }, React.createElement(SlideContent, {
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
}(React.PureComponent);

Slide.defaultProps = {
  align: 'center center',
  presenterStyle: {},
  style: {},
  viewerScaleMode: false
};
Slide.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  contentStyles: PropTypes.object,
  dispatch: PropTypes.func,
  export: PropTypes.bool,
  getAnimStep: PropTypes.func,
  getAppearStep: PropTypes.func,
  hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastSlideIndex: PropTypes.number,
  margin: PropTypes.number,
  notes: PropTypes.any,
  onActive: PropTypes.func,
  presenterStyle: PropTypes.object,
  print: PropTypes.bool,
  slideIndex: PropTypes.number,
  slideReference: PropTypes.array,
  state: PropTypes.string,
  style: PropTypes.object,
  transition: PropTypes.array,
  transitionDuration: PropTypes.number,
  transitionIn: PropTypes.array,
  transitionOut: PropTypes.array,
  viewerScaleMode: PropTypes.bool
};
Slide.contextTypes = {
  contentHeight: PropTypes.number,
  contentWidth: PropTypes.number,
  export: PropTypes.bool,
  onStateChange: PropTypes.func.isRequired,
  overview: PropTypes.bool,
  print: PropTypes.object,
  store: PropTypes.object,
  styles: PropTypes.object
};
Slide.childContextTypes = {
  slideHash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stepCounter: PropTypes.shape({
    setFragments: PropTypes.func
  })
};
export default Slide;