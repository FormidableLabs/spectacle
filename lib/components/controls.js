"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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
      return _react.default.createElement("div", null, this.props.currentSlideIndex !== 0 && _react.default.createElement("button", {
        type: "button",
        key: "prev",
        "aria-label": "Previous slide",
        onClick: this.props.onPrev,
        style: this.context.styles.controls.prev
      }, _react.default.createElement("svg", {
        key: "prevIcon",
        style: this.resolveFillStyle('prevIcon'),
        width: "32px",
        height: "32px",
        viewBox: "0 0 512 828.586",
        role: "presentation",
        focusable: "false"
      }, _react.default.createElement("path", {
        d: "M512,97.707L414.293,0L0,414.293l414.293,414.293L512,730.88L195.414,414.293L512,97.707z"
      }))), this.props.currentSlideIndex < this.props.totalSlides - 1 && _react.default.createElement("button", {
        type: "button",
        key: "next",
        "aria-label": "Next slide",
        onClick: this.props.onNext,
        style: this.context.styles.controls.next
      }, _react.default.createElement("svg", {
        key: "nextIcon",
        style: this.resolveFillStyle('nextIcon'),
        width: "32px",
        height: "32px",
        viewBox: "0 0 512 828.586",
        role: "presentation",
        focusable: "false"
      }, _react.default.createElement("path", {
        d: "M97.707,0L0,97.707l316.586,316.586L0,730.88l97.707,97.706L512,414.293L97.707,0z"
      }))));
    }
  }]);

  return Controls;
}(_react.Component);

exports.default = Controls;
Controls.propTypes = {
  controlColor: _propTypes.default.string,
  currentSlideIndex: _propTypes.default.number,
  onNext: _propTypes.default.func,
  onPrev: _propTypes.default.func,
  totalSlides: _propTypes.default.number
};
Controls.contextTypes = {
  styles: _propTypes.default.object
};