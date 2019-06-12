function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React, { cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import { getSlideByIndex } from '../utils/slides';
import styled from 'react-emotion';
var OverviewContainer =
/*#__PURE__*/
styled("div", {
  target: "euot5m50"
})("height:100%;overflow:scroll;width:100%;");
var SlideThumbnail =
/*#__PURE__*/
styled("div", {
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
        var slide = getSlideByIndex(_this2.props.slides, _this2.props.slideReference, index);
        var el = cloneElement(slide, {
          key: index,
          slideIndex: index,
          export: _this2.props.route.params.indexOf('export') !== -1,
          print: _this2.props.route.params.indexOf('print') !== -1,
          transition: [],
          transitionDuration: 0,
          appearOff: true
        });
        return React.createElement(SlideThumbnail, {
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
      return React.createElement(OverviewContainer, null, this._renderSlides());
    }
  }]);

  return Overview;
}(Component);

export { Overview as default };
Overview.propTypes = {
  resetViewedIndexes: PropTypes.function,
  route: PropTypes.object,
  slideIndex: PropTypes.number,
  slideReference: PropTypes.array,
  slides: PropTypes.array
};
Overview.contextTypes = {
  styles: PropTypes.object,
  history: PropTypes.object
};