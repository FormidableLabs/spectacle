function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Component } from 'react';
import PropTypes from 'prop-types';

var Context =
/*#__PURE__*/
function (_Component) {
  _inherits(Context, _Component);

  function Context() {
    _classCallCheck(this, Context);

    return _possibleConstructorReturn(this, _getPrototypeOf(Context).apply(this, arguments));
  }

  _createClass(Context, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this$props = this.props,
          history = _this$props.history,
          onStateChange = _this$props.onStateChange,
          styles = _this$props.styles,
          store = _this$props.store;
      return {
        history: history,
        onStateChange: onStateChange,
        store: store,
        styles: styles
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return Context;
}(Component);

_defineProperty(Context, "displayName", 'Context');

_defineProperty(Context, "propTypes", {
  children: PropTypes.node,
  history: PropTypes.object,
  onStateChange: PropTypes.func,
  store: PropTypes.object,
  styles: PropTypes.object
});

_defineProperty(Context, "childContextTypes", {
  history: PropTypes.object,
  onStateChange: PropTypes.func,
  styles: PropTypes.object,
  store: PropTypes.object
});

export default Context;