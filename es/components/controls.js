function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

var Controls =
/*#__PURE__*/
function (_Component) {
  _inherits(Controls, _Component);

  function Controls() {
    var _this;

    _classCallCheck(this, Controls);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Controls).apply(this, arguments));
    _this.resolveFillStyle = _this.resolveFillStyle.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Controls, [{
    key: "resolveFillStyle",
    value: function resolveFillStyle(name) {
      var color;
      var controlColor = this.props.controlColor;

      if (controlColor) {
        if (!this.context.styles.colors.hasOwnProperty(controlColor)) {
          color = controlColor;
        } else {
          color = this.context.styles.colors[controlColor];
        }

        return {
          fill: color
        };
      }

      return this.context.styles.controls[name];
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, this.props.currentSlideIndex !== 0 && React.createElement("button", {
        type: "button",
        key: "prev",
        "aria-label": "Previous slide",
        onClick: this.props.onPrev,
        style: this.context.styles.controls.prev
      }, React.createElement("svg", {
        key: "prevIcon",
        style: this.resolveFillStyle('prevIcon'),
        width: "32px",
        height: "32px",
        viewBox: "0 0 512 828.586",
        role: "presentation",
        focusable: "false"
      }, React.createElement("path", {
        d: "M512,97.707L414.293,0L0,414.293l414.293,414.293L512,730.88L195.414,414.293L512,97.707z"
      }))), this.props.currentSlideIndex < this.props.totalSlides - 1 && React.createElement("button", {
        type: "button",
        key: "next",
        "aria-label": "Next slide",
        onClick: this.props.onNext,
        style: this.context.styles.controls.next
      }, React.createElement("svg", {
        key: "nextIcon",
        style: this.resolveFillStyle('nextIcon'),
        width: "32px",
        height: "32px",
        viewBox: "0 0 512 828.586",
        role: "presentation",
        focusable: "false"
      }, React.createElement("path", {
        d: "M97.707,0L0,97.707l316.586,316.586L0,730.88l97.707,97.706L512,414.293L97.707,0z"
      }))));
    }
  }]);

  return Controls;
}(Component);

export { Controls as default };
Controls.propTypes = {
  controlColor: PropTypes.string,
  currentSlideIndex: PropTypes.number,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  totalSlides: PropTypes.number
};
Controls.contextTypes = {
  styles: PropTypes.object
};