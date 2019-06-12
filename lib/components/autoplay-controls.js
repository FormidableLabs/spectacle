"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactEmotion = _interopRequireDefault(require("react-emotion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AutoplayButton =
/*#__PURE__*/
(0, _reactEmotion.default)("button", {
  target: "ez7thfw0"
})(function (_ref) {
  var styles = _ref.styles;
  return [{
    opacity: 0,
    cursor: 'pointer',
    transition: '300ms opacity ease',
    ':hover': {
      opacity: 1
    }
  }, styles.context];
});

var AutoplayControls =
/*#__PURE__*/
function (_Component) {
  _inherits(AutoplayControls, _Component);

  function AutoplayControls() {
    _classCallCheck(this, AutoplayControls);

    return _possibleConstructorReturn(this, _getPrototypeOf(AutoplayControls).apply(this, arguments));
  }

  _createClass(AutoplayControls, [{
    key: "render",
    value: function render() {
      var pauseBtn = _react.default.createElement(AutoplayButton, {
        type: "button",
        key: "pause",
        onClick: this.props.onPause,
        styles: {
          context: this.context.styles.autoplay.pause
        }
      }, _react.default.createElement("svg", {
        style: this.context.styles.autoplay.pauseIcon,
        xmlns: "http://www.w3.org/2000/svg",
        width: "30px",
        height: "30px",
        viewBox: "0 0 30 30"
      }, _react.default.createElement("path", {
        d: "M23.5,4V26h-6V4ZM6.5,26h6V4h-6Z"
      })));

      var playBtn = _react.default.createElement(AutoplayButton, {
        type: "button",
        key: "play",
        onClick: this.props.onPlay,
        styles: {
          context: this.context.styles.autoplay.play
        }
      }, _react.default.createElement("svg", {
        style: this.context.styles.autoplay.playIcon,
        xmlns: "http://www.w3.org/2000/svg",
        width: "30px",
        height: "30px",
        viewBox: "0 0 30 30"
      }, _react.default.createElement("path", {
        d: "M26,15,6,25V5Z"
      })));

      return this.props.autoplaying ? pauseBtn : playBtn;
    }
  }]);

  return AutoplayControls;
}(_react.Component);

exports.default = AutoplayControls;
AutoplayControls.propTypes = {
  autoplaying: _propTypes.default.bool,
  onPause: _propTypes.default.func,
  onPlay: _propTypes.default.func
};
AutoplayControls.contextTypes = {
  styles: _propTypes.default.object
};