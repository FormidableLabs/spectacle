"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultOnStateChange = defaultOnStateChange;
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _store = _interopRequireDefault(require("../store"));

var _controller = _interopRequireDefault(require("../utils/controller"));

var _manager = _interopRequireDefault(require("./manager"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var store = (0, _store.default)();

function defaultOnStateChange(prevState, nextState) {
  if (nextState) {
    document.documentElement.classList.add(nextState);
  }

  if (prevState) {
    document.documentElement.classList.remove(prevState);
  }
}

var Deck =
/*#__PURE__*/
function (_Component) {
  _inherits(Deck, _Component);

  function Deck() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Deck);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Deck)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      slideState: undefined
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleStateChange", function (nextState) {
      var prevState = _this.state.slideState;

      if (prevState !== nextState) {
        _this.props.onStateChange(prevState, nextState);

        _this.setState({
          slideState: nextState
        });
      }
    });

    return _this;
  }

  _createClass(Deck, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // Cleanup default onStateChange
      if (this.state.slideState && !this.props.onStateChange) {
        document.documentElement.classList.remove(this.state.slideState);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_reactRedux.Provider, {
        store: store
      }, _react.default.createElement(_controller.default, {
        theme: this.props.theme,
        store: store,
        history: this.props.history,
        onStateChange: this.handleStateChange
      }, _react.default.createElement(_manager.default, this.props, this.props.children)));
    }
  }]);

  return Deck;
}(_react.Component);

exports.default = Deck;

_defineProperty(Deck, "displayName", 'Deck');

_defineProperty(Deck, "propTypes", {
  autoplay: _propTypes.default.bool,
  autoplayDuration: _propTypes.default.number,
  autoplayLoop: _propTypes.default.bool,
  autoplayOnStart: _propTypes.default.bool,
  children: _propTypes.default.node,
  controls: _propTypes.default.bool,
  disableKeyboardControls: _propTypes.default.bool,
  globalStyles: _propTypes.default.bool,
  history: _propTypes.default.object,
  onStateChange: _propTypes.default.func,
  progress: _propTypes.default.oneOf(['pacman', 'bar', 'number', 'none']),
  showFullscreenControl: _propTypes.default.bool,
  theme: _propTypes.default.object,
  transition: _propTypes.default.array,
  transitionDuration: _propTypes.default.number
});

_defineProperty(Deck, "defaultProps", {
  onStateChange: defaultOnStateChange,
  showFullscreenControl: true
});