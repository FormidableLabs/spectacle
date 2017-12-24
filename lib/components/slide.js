'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _base = require('../utils/base');

var _actions = require('../actions');

var _stepCounter = require('../utils/step-counter');

var _stepCounter2 = _interopRequireDefault(_stepCounter);

var _slideComponents = require('./slide-components');

var _victoryCore = require('victory-core');

var _findIndex = require('lodash/findIndex');

var _findIndex2 = _interopRequireDefault(_findIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-invalid-this, max-statements */
var Slide = function (_React$PureComponent) {
  (0, _inherits3.default)(Slide, _React$PureComponent);

  function Slide() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Slide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args))), _this), _this.state = {
      contentScale: 1,
      reverse: false,
      transitioning: true,
      z: 1,
      zoom: 1
    }, _this.routerCallback = function (callback) {
      var _this$props = _this.props,
          transition = _this$props.transition,
          transitionDuration = _this$props.transitionDuration;

      if (transition.length > 0) {
        setTimeout(function () {
          return callback();
        }, transitionDuration);
      } else {
        callback();
      }
    }, _this.stepCounter = (0, _stepCounter2.default)(), _this.setZoom = function () {
      var mobile = window.matchMedia('(max-width: 628px)').matches;
      var content = _this.contentRef;
      if (content) {
        var zoom = _this.props.viewerScaleMode ? 1 : content.offsetWidth / _this.context.contentWidth;

        var contentScaleY = content.parentNode.offsetHeight / _this.context.contentHeight;
        var contentScaleX = _this.props.viewerScaleMode ? content.parentNode.offsetWidth / _this.context.contentWidth : content.parentNode.offsetWidth / _this.context.contentHeight;
        var minScale = Math.min(contentScaleY, contentScaleX);

        var contentScale = minScale < 1 ? minScale : 1;
        if (mobile && _this.props.viewerScaleMode !== true) {
          contentScale = 1;
        }
        _this.setState({
          zoom: zoom > 0.6 ? zoom : 0.6,
          contentScale: contentScale
        });
      }
    }, _this.transitionDirection = function () {
      var _this$props2 = _this.props,
          slideIndex = _this$props2.slideIndex,
          lastSlideIndex = _this$props2.lastSlideIndex;

      var routeSlideIndex = _this.getRouteSlideIndex();
      return _this.state.reverse ? slideIndex > routeSlideIndex : slideIndex > lastSlideIndex;
    }, _this.getTransitionKeys = function () {
      var _this2 = _this,
          _this2$props = _this2.props,
          _this2$props$transiti = _this2$props.transition,
          transition = _this2$props$transiti === undefined ? [] : _this2$props$transiti,
          _this2$props$transiti2 = _this2$props.transitionIn,
          transitionIn = _this2$props$transiti2 === undefined ? [] : _this2$props$transiti2,
          _this2$props$transiti3 = _this2$props.transitionOut,
          transitionOut = _this2$props$transiti3 === undefined ? [] : _this2$props$transiti3,
          reverse = _this2.state.reverse;

      if (reverse && transitionOut.length > 0) {
        return transitionOut;
      } else if (transitionIn.length > 0) {
        return transitionIn;
      }
      return transition;
    }, _this.getTransitionStyles = function () {
      var _this$state = _this.state,
          transitioning = _this$state.transitioning,
          z = _this$state.z;

      var transition = _this.getTransitionKeys();
      var styles = { zIndex: z };
      var transformValue = '';

      if (transition.indexOf('fade') !== -1) {
        styles = (0, _extends3.default)({}, styles, { opacity: transitioning ? 0 : 1 });
      }

      if (transition.indexOf('zoom') !== -1) {
        transformValue += ' scale(' + (transitioning ? 0.1 : 1.0) + ')';
      }

      if (transition.indexOf('slide') !== -1) {
        var offset = _this.transitionDirection() ? 100 : -100;
        transformValue += ' translate3d(' + (transitioning ? offset : 0) + '%, 0, 0)';
      } else {
        transformValue += ' translate3d(0px, 0px, 0px)';
      }

      if (transition.indexOf('spin') !== -1) {
        var angle = _this.transitionDirection() ? 90 : -90;
        transformValue += ' rotateY(' + (transitioning ? angle : 0) + 'deg)';
      }

      var functionStyles = transition.reduce(function (memo, current) {
        if ((0, _isFunction2.default)(current)) {
          return (0, _extends3.default)({}, memo, current(transitioning, _this.transitionDirection()));
        }
        return memo;
      }, {});

      return (0, _extends3.default)({}, styles, { transform: transformValue }, functionStyles);
    }, _this.getRouteSlideIndex = function () {
      var slideReference = _this.props.slideReference;

      var _this$context$store$g = _this.context.store.getState(),
          route = _this$context$store$g.route;

      var slide = route.slide;

      var slideIndex = (0, _findIndex2.default)(slideReference, function (reference) {
        return slide === String(reference.id);
      });
      return Math.max(0, slideIndex);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Slide.prototype.getChildContext = function getChildContext() {
    return {
      stepCounter: {
        setFragments: this.stepCounter.setFragments
      },
      slideHash: this.props.hash
    };
  };

  Slide.prototype.componentDidMount = function componentDidMount() {
    var _this3 = this;

    this.setZoom();
    var slide = this.slideRef;
    var frags = slide.querySelectorAll('.fragment');
    var currentOrder = 0;
    if (frags && frags.length && !this.context.overview) {
      Array.prototype.slice.call(frags, 0).sort(function (lhs, rhs) {
        return parseInt(lhs.dataset.order, 10) - parseInt(rhs.dataset.order, 10);
      }).forEach(function (frag) {
        frag.dataset.fid = currentOrder;
        if (_this3.props.dispatch) {
          _this3.props.dispatch((0, _actions.addFragment)({
            className: frag.className || '',
            slide: _this3.props.hash,
            id: _this3.props.slideIndex + '-' + currentOrder,
            visible: _this3.props.lastSlideIndex > _this3.props.slideIndex
          }));
        }
        currentOrder += 1;
      });
    }
    window.addEventListener('load', this.setZoom);
    window.addEventListener('resize', this.setZoom);

    if ((0, _isFunction2.default)(this.props.onActive)) {
      this.props.onActive(this.props.slideIndex);
    }
  };

  Slide.prototype.componentDidUpdate = function componentDidUpdate() {
    var _stepCounter$getSteps = this.stepCounter.getSteps(),
        steps = _stepCounter$getSteps.steps,
        slideIndex = _stepCounter$getSteps.slideIndex;

    if (this.props.getAppearStep) {
      if (slideIndex === this.props.slideIndex) {
        this.props.getAppearStep(steps);
      }
    }
  };

  Slide.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('load', this.setZoom);
    window.removeEventListener('resize', this.setZoom);
  };

  Slide.prototype.componentWillEnter = function componentWillEnter(callback) {
    this.setState({ transitioning: false, reverse: false, z: 1 });
    this.routerCallback(callback);
  };

  Slide.prototype.componentWillAppear = function componentWillAppear(callback) {
    this.setState({ transitioning: false, reverse: false, z: 1 });
    this.routerCallback(callback);
  };

  Slide.prototype.componentWillLeave = function componentWillLeave(callback) {
    this.setState({ transitioning: true, reverse: true, z: '' });
    this.routerCallback(callback);
  };

  Slide.prototype.render = function render() {
    var _this4 = this;

    var _props = this.props,
        presenterStyle = _props.presenterStyle,
        children = _props.children,
        transitionDuration = _props.transitionDuration;


    if (!this.props.viewerScaleMode) {
      document.documentElement.style.fontSize = 16 * this.state.zoom + 'px';
    }

    var contentClass = (0, _isUndefined2.default)(this.props.className) ? '' : this.props.className;

    return (0, _jsx3.default)(_victoryCore.VictoryAnimation, {
      data: this.getTransitionStyles(),
      duration: transitionDuration,
      easing: 'quadInOut'
    }, void 0, function (animatedStyles) {
      return (0, _jsx3.default)(_slideComponents.SlideContainer, {
        className: 'spectacle-slide',
        innerRef: function innerRef(s) {
          _this4.slideRef = s;
        },
        exportMode: _this4.props.export,
        printMode: _this4.props.print,
        background: _this4.context.styles.global.body.background,
        styles: {
          base: _base.getStyles.call(_this4),
          presenter: presenterStyle
        },
        style: (0, _extends3.default)({}, animatedStyles)
      }, void 0, (0, _jsx3.default)(_slideComponents.SlideContentWrapper, {
        align: _this4.props.align,
        overviewMode: _this4.context.overview
      }, void 0, (0, _jsx3.default)(_slideComponents.SlideContent, {
        innerRef: function innerRef(c) {
          _this4.contentRef = c;
        },
        className: contentClass + ' spectacle-content',
        overviewMode: _this4.context.overview,
        width: _this4.context.contentWidth,
        height: _this4.context.contentHeight,
        scale: _this4.state.contentScale,
        zoom: _this4.state.zoom,
        margin: _this4.props.margin,
        styles: { context: _this4.context.styles.components.content }
      }, void 0, children)));
    });
  };

  return Slide;
}(_react2.default.PureComponent);

Slide.defaultProps = {
  align: 'center center',
  presenterStyle: {},
  style: {},
  viewerScaleMode: false
};

Slide.contextTypes = {
  styles: _propTypes2.default.object,
  contentWidth: _propTypes2.default.number,
  contentHeight: _propTypes2.default.number,
  export: _propTypes2.default.bool,
  print: _propTypes2.default.object,
  overview: _propTypes2.default.bool,
  store: _propTypes2.default.object
};

Slide.childContextTypes = {
  slideHash: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  stepCounter: _propTypes2.default.shape({
    setFragments: _propTypes2.default.func
  })
};

exports.default = Slide;