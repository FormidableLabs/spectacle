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

var _slides = require('../utils/slides');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OverviewContainer = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
  target: 'css-192tn180'
})('height:100%;overflow:scroll;width:100%;');

var SlideThumbnail = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
  target: 'css-192tn181'
})('cursor:pointer;position:relative;float:left;height:', function (_ref) {
  var screen = _ref.screen;
  return screen / 3 * 0.7;
}, 'px;opacity:', function (_ref2) {
  var index = _ref2.index,
      slideIndex = _ref2.slideIndex;
  return index === slideIndex ? 1 : 0.5;
}, ';transition:opacity 333ms ease-in-out;width:', function (_ref3) {
  var screen = _ref3.screen;
  return screen / 3;
}, 'px;&:hover{opacity:1;}');

var Overview = function (_Component) {
  (0, _inherits3.default)(Overview, _Component);

  function Overview(props) {
    (0, _classCallCheck3.default)(this, Overview);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      overviewWidth: document.documentElement.clientWidth
    };
    _this.resizeHandler = _this.resizeHandler.bind(_this);
    return _this;
  }

  Overview.prototype.componentDidMount = function componentDidMount() {
    this.resizeHandler();
    window.addEventListener('resize', this.resizeHandler);
  };

  Overview.prototype.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  };

  Overview.prototype._slideClicked = function _slideClicked(index) {
    this.context.history.replace('/' + this._getHash(index));
  };

  Overview.prototype._getHash = function _getHash(slideIndex) {
    return this.props.slideReference[slideIndex].id;
  };

  Overview.prototype._renderSlides = function _renderSlides() {
    var _this2 = this;

    var slideIndex = this.props.slideIndex;
    var screen = this.state.overviewWidth;
    return this.props.slideReference.map(function (reference, index) {
      var slide = (0, _slides.getSlideByIndex)(_this2.props.slides, _this2.props.slideReference, index);
      var el = (0, _react.cloneElement)(slide, {
        key: index,
        slideIndex: index,
        export: _this2.props.route.params.indexOf('export') !== -1,
        print: _this2.props.route.params.indexOf('print') !== -1,
        transition: [],
        transitionDuration: 0,
        appearOff: true
      });
      return (0, _jsx3.default)(SlideThumbnail, {
        index: index,
        screen: screen,
        slideIndex: slideIndex,
        onClick: _this2._slideClicked.bind(_this2, index)
      }, index, el);
    });
  };

  Overview.prototype.resizeHandler = function resizeHandler() {
    this.setState({
      overviewWidth: document.documentElement.clientWidth
    });
  };

  Overview.prototype.render = function render() {
    return (0, _jsx3.default)(OverviewContainer, {}, void 0, this._renderSlides());
  };

  return Overview;
}(_react.Component);

exports.default = Overview;


Overview.contextTypes = {
  styles: _propTypes2.default.object,
  history: _propTypes2.default.object
};