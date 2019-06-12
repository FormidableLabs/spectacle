"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _slides = require("../utils/slides");

var _reactEmotion = _interopRequireDefault(require("react-emotion"));

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

var OverviewContainer =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "euot5m50"
})("height:100%;overflow:scroll;width:100%;");
var SlideThumbnail =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "euot5m51"
})("cursor:pointer;position:relative;float:left;height:", function (_ref) {
  var screen = _ref.screen;
  return screen / 3 * 0.7;
}, "px;opacity:", function (_ref2) {
  var index = _ref2.index,
      slideIndex = _ref2.slideIndex;
  return index === slideIndex ? 1 : 0.5;
}, ";transition:opacity 333ms ease-in-out;width:", function (_ref3) {
  var screen = _ref3.screen;
  return screen / 3;
}, "px;&:hover{opacity:1;}");

var Overview =
/*#__PURE__*/
function (_Component) {
  _inherits(Overview, _Component);

  function Overview() {
    var _this;

    _classCallCheck(this, Overview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Overview).apply(this, arguments));
    _this.resizeHandler = _this.resizeHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      overviewWidth: document.documentElement.clientWidth
    };
    return _this;
  }

  _createClass(Overview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resizeHandler();
      window.addEventListener('resize', this.resizeHandler);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }, {
    key: "_slideClicked",
    value: function _slideClicked(index) {
      this.props.resetViewedIndexes();
      this.context.history.replace("/".concat(this._getHash(index)));
    }
  }, {
    key: "_getHash",
    value: function _getHash(slideIndex) {
      return this.props.slideReference[slideIndex].id;
    }
  }, {
    key: "_renderSlides",
    value: function _renderSlides() {
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
        return _react.default.createElement(SlideThumbnail, {
          index: index,
          screen: screen,
          slideIndex: slideIndex,
          key: index,
          onClick: _this2._slideClicked.bind(_this2, index)
        }, el);
      });
    }
  }, {
    key: "resizeHandler",
    value: function resizeHandler() {
      this.setState({
        overviewWidth: document.documentElement.clientWidth
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(OverviewContainer, null, this._renderSlides());
    }
  }]);

  return Overview;
}(_react.Component);

exports.default = Overview;
Overview.propTypes = {
  resetViewedIndexes: _propTypes.default.function,
  route: _propTypes.default.object,
  slideIndex: _propTypes.default.number,
  slideReference: _propTypes.default.array,
  slides: _propTypes.default.array
};
Overview.contextTypes = {
  styles: _propTypes.default.object,
  history: _propTypes.default.object
};