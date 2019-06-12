"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isFunction = _interopRequireDefault(require("lodash/isFunction"));

var _victoryCore = require("victory-core");

var _findIndex = _interopRequireDefault(require("lodash/findIndex"));

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

var SlideWrapper =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(SlideWrapper, _React$PureComponent);

  function SlideWrapper() {
    var _this;

    _classCallCheck(this, SlideWrapper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SlideWrapper).apply(this, arguments));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      reverse: false,
      transitioning: true,
      z: 1
    });

    _this.routerCallback = _this.routerCallback.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.transitionDirection = _this.transitionDirection.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getTransitionKeys = _this.getTransitionKeys.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getTransitionStyles = _this.getTransitionStyles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getRouteSlideIndex = _this.getRouteSlideIndex.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(SlideWrapper, [{
    key: "componentWillEnter",
    value: function componentWillEnter(callback) {
      this.setState({
        transitioning: false,
        reverse: false,
        z: 1
      });
      this.routerCallback(callback);
    }
  }, {
    key: "componentWillAppear",
    value: function componentWillAppear(callback) {
      this.setState({
        transitioning: false,
        reverse: false,
        z: 1
      });
      this.routerCallback(callback);
    }
  }, {
    key: "componentWillLeave",
    value: function componentWillLeave(callback) {
      this.setState({
        transitioning: true,
        reverse: true,
        z: ''
      });
      this.routerCallback(callback);
    }
  }, {
    key: "routerCallback",
    value: function routerCallback(callback) {
      var _this$props = this.props,
          transition = _this$props.transition,
          transitionDuration = _this$props.transitionDuration;

      if (transition.length > 0) {
        setTimeout(function () {
          return callback();
        }, transitionDuration);
      } else {
        callback();
      }
    }
  }, {
    key: "transitionDirection",
    value: function transitionDirection() {
      var _this$props2 = this.props,
          slideIndex = _this$props2.slideIndex,
          lastSlideIndex = _this$props2.lastSlideIndex;
      var routeSlideIndex = this.getRouteSlideIndex();
      return this.state.reverse ? slideIndex > routeSlideIndex : slideIndex > lastSlideIndex;
    }
  }, {
    key: "getTransitionKeys",
    value: function getTransitionKeys() {
      var _this$props3 = this.props,
          _this$props3$transiti = _this$props3.transition,
          transition = _this$props3$transiti === void 0 ? [] : _this$props3$transiti,
          _this$props3$transiti2 = _this$props3.transitionIn,
          transitionIn = _this$props3$transiti2 === void 0 ? [] : _this$props3$transiti2,
          _this$props3$transiti3 = _this$props3.transitionOut,
          transitionOut = _this$props3$transiti3 === void 0 ? [] : _this$props3$transiti3,
          reverse = this.state.reverse;

      if (reverse && transitionOut.length > 0) {
        return transitionOut;
      } else if (transitionIn.length > 0) {
        return transitionIn;
      }

      return transition;
    } // eslint-disable-next-line

  }, {
    key: "getTransitionStyles",
    value: function getTransitionStyles() {
      var _this2 = this;

      var _this$state = this.state,
          transitioning = _this$state.transitioning,
          z = _this$state.z;
      var transition = this.getTransitionKeys();
      var styles = {
        zIndex: z
      };
      var transformValue = '';

      if (transition.indexOf('fade') !== -1) {
        styles = _objectSpread({}, styles, {
          opacity: transitioning ? 0 : 1
        });
      }

      if (transition.indexOf('zoom') !== -1) {
        transformValue += " scale(".concat(transitioning ? 0.1 : 1.0, ")");
      }

      if (transition.indexOf('slide') !== -1) {
        var offset = this.transitionDirection() ? 100 : -100;
        transformValue += " translate3d(".concat(transitioning ? offset : 0, "%, 0, 0)");
      } else {
        transformValue += ' translate3d(0px, 0px, 0px)';
      }

      if (transition.indexOf('spin') !== -1) {
        var angle = this.transitionDirection() ? 90 : -90;
        transformValue += " rotateY(".concat(transitioning ? angle : 0, "deg)");
      }

      var functionStyles = transition.reduce(function (memo, current) {
        if ((0, _isFunction.default)(current)) {
          return _objectSpread({}, memo, current(transitioning, _this2.transitionDirection()));
        }

        return memo;
      }, {});
      return _objectSpread({}, styles, {
        transform: transformValue
      }, functionStyles);
    }
  }, {
    key: "getRouteSlideIndex",
    value: function getRouteSlideIndex() {
      var slideReference = this.props.slideReference;

      var _this$context$store$g = this.context.store.getState(),
          route = _this$context$store$g.route;

      var slide = route.slide;
      var slideIndex = (0, _findIndex.default)(slideReference, function (reference) {
        return slide === String(reference.id);
      });
      return Math.max(0, slideIndex);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props4 = this.props,
          children = _this$props4.children,
          transitionDuration = _this$props4.transitionDuration;

      if (!this.props.viewerScaleMode) {
        document.documentElement.style.fontSize = "".concat(16 * this.state.zoom, "px");
      }

      return _react.default.createElement(_victoryCore.VictoryAnimation, {
        data: this.getTransitionStyles(),
        duration: transitionDuration,
        easing: "quadInOut"
      }, function (animatedStyles) {
        return _react.default.createElement("div", {
          style: _objectSpread({}, animatedStyles, {
            transformOrigin: 'center center',
            position: _this3.props.export ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            overflow: 'hidden',
            backgroundColor: _this3.context.styles.global.body.background || ''
          })
        }, children);
      });
    }
  }]);

  return SlideWrapper;
}(_react.default.PureComponent);

SlideWrapper.defaultProps = {
  align: 'center center',
  presenterStyle: {},
  style: {},
  viewerScaleMode: false
};
SlideWrapper.propTypes = {
  align: _propTypes.default.string,
  children: _propTypes.default.node,
  className: _propTypes.default.string,
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
  style: _propTypes.default.object,
  transition: _propTypes.default.array,
  transitionDuration: _propTypes.default.number,
  transitionIn: _propTypes.default.array,
  transitionOut: _propTypes.default.array,
  viewerScaleMode: _propTypes.default.bool
};
SlideWrapper.contextTypes = {
  styles: _propTypes.default.object,
  contentWidth: _propTypes.default.number,
  contentHeight: _propTypes.default.number,
  export: _propTypes.default.bool,
  print: _propTypes.default.object,
  overview: _propTypes.default.bool,
  store: _propTypes.default.object
};
var _default = SlideWrapper;
exports.default = _default;