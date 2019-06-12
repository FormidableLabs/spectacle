"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _findKey = _interopRequireDefault(require("lodash/findKey"));

var _reactRedux = require("react-redux");

var _reactDom = require("react-dom");

var _victoryCore = require("victory-core");

var _types = require("../utils/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var Anim =
/*#__PURE__*/
function (_Component) {
  _inherits(Anim, _Component);

  function Anim() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Anim);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Anim)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      activeAnimation: -1
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "disableAnimation", function () {
      if (_this.state.activeAnimation !== _this.props.toStyle.length - 1) {
        _this.setState({
          activeAnimation: _this.props.toStyle.length - 1
        });
      }

      return;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateAnimation", function (nextAnimation) {
      if (_this.state.activeAnimation !== nextAnimation) {
        _this.setState({
          activeAnimation: nextAnimation
        });
      }

      return;
    });

    return _this;
  }

  _createClass(Anim, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var shouldDisableAnimation = this.props.route.params.indexOf('export') !== -1 || this.props.route.params.indexOf('overview') !== -1 || this.props.route.params.indexOf('notes') !== -1;

      if (shouldDisableAnimation) {
        this.setState({
          activeAnimation: this.props.toStyle.length - 1
        });
        return;
      }

      var order = this.props.order;
      var node = (0, _reactDom.findDOMNode)(this.fragmentRef);

      if (!node.dataset) {
        node.dataset = {};
      }

      node.dataset.order = order;
      node.dataset.animCount = this.props.toStyle.length;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var shouldDisableAnimation = this.props.route.params.indexOf('export') !== -1 || this.props.route.params.indexOf('overview') !== -1 || this.props.route.params.indexOf('notes') !== -1;

      if (shouldDisableAnimation) {
        this.disableAnimation();
      }

      var animationStatus = this.getAnimationStatus();

      if (animationStatus) {
        var nextAnimation = animationStatus.every(function (a) {
          return a === true;
        }) ? animationStatus.length - 1 : animationStatus.indexOf(false) - 1;

        if (prevState.activeAnimation !== nextAnimation) {
          var state = this.props.fragment;
          var slide = prevProps.route.slide;
          this.context.stepCounter.setFragments(state.fragments[slide], slide);

          if (prevProps.onAnim) {
            var forward = prevState.activeAnimation < nextAnimation;
            prevProps.onAnim(forward, nextAnimation);
          }

          this.updateAnimation(nextAnimation);
        }
      }
    }
  }, {
    key: "getAnimationStatus",
    value: function getAnimationStatus() {
      var state = this.props.fragment;
      var slide = this.props.route.slide;
      var fragment = (0, _reactDom.findDOMNode)(this.fragmentRef);
      var key = (0, _findKey.default)(state.fragments[slide], {
        id: "".concat(this.context.slideHash, "-").concat(parseInt(fragment.dataset.fid, 10))
      });

      if (slide in state.fragments && state.fragments[slide].hasOwnProperty(key)) {
        return state.fragments[slide][key].animations;
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          children = _this$props.children,
          fromStyle = _this$props.fromStyle,
          toStyle = _this$props.toStyle,
          transitionDuration = _this$props.transitionDuration,
          easing = _this$props.easing,
          style = _this$props.style;

      var child = _react.default.Children.only(children);

      var tweenData = this.state.activeAnimation === -1 ? fromStyle : toStyle[this.state.activeAnimation];
      return _react.default.createElement(_victoryCore.VictoryAnimation, {
        data: tweenData,
        duration: transitionDuration,
        easing: easing
      }, function (tweenStyle) {
        return _react.default.cloneElement(child, {
          className: "fragment ".concat(child.props.className).trim(),
          style: _objectSpread({}, child.props.style, style, tweenStyle),
          ref: function ref(f) {
            _this2.fragmentRef = f;
          }
        });
      });
    }
  }]);

  return Anim;
}(_react.Component);

Anim.defaultProps = {
  order: 0
};
Anim.propTypes = {
  children: _propTypes.default.node,
  easing: _propTypes.default.oneOf(_types.victoryEases).isRequired,
  fragment: _propTypes.default.object,
  fromStyle: _propTypes.default.object.isRequired,
  onAnim: _propTypes.default.func,
  order: _propTypes.default.number,
  route: _propTypes.default.object,
  style: _propTypes.default.object,
  toStyle: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  transitionDuration: _propTypes.default.number.isRequired
};
Anim.contextTypes = {
  export: _propTypes.default.bool,
  overview: _propTypes.default.bool,
  slide: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  slideHash: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  stepCounter: _propTypes.default.shape({
    setFragments: _propTypes.default.func
  })
};

var _default = (0, _reactRedux.connect)(function (state) {
  return state;
})(Anim);

exports.default = _default;