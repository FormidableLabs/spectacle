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

/* eslint-disable react/no-did-mount-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findKey from 'lodash/findKey';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { VictoryAnimation } from 'victory-core';
import { victoryEases } from '../utils/types';

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
      var node = findDOMNode(this.fragmentRef);

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
      var fragment = findDOMNode(this.fragmentRef);
      var key = findKey(state.fragments[slide], {
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
      var child = React.Children.only(children);
      var tweenData = this.state.activeAnimation === -1 ? fromStyle : toStyle[this.state.activeAnimation];
      return React.createElement(VictoryAnimation, {
        data: tweenData,
        duration: transitionDuration,
        easing: easing
      }, function (tweenStyle) {
        return React.cloneElement(child, {
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
}(Component);

Anim.defaultProps = {
  order: 0
};
Anim.propTypes = {
  children: PropTypes.node,
  easing: PropTypes.oneOf(victoryEases).isRequired,
  fragment: PropTypes.object,
  fromStyle: PropTypes.object.isRequired,
  onAnim: PropTypes.func,
  order: PropTypes.number,
  route: PropTypes.object,
  style: PropTypes.object,
  toStyle: PropTypes.arrayOf(PropTypes.object).isRequired,
  transitionDuration: PropTypes.number.isRequired
};
Anim.contextTypes = {
  export: PropTypes.bool,
  overview: PropTypes.bool,
  slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  slideHash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stepCounter: PropTypes.shape({
    setFragments: PropTypes.func
  })
};
export default connect(function (state) {
  return state;
})(Anim);