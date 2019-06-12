function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
import MagicWrapper from './magic-wrapper';

var Magic =
/*#__PURE__*/
function (_Component) {
  _inherits(Magic, _Component);

  function Magic() {
    var _this;

    _classCallCheck(this, Magic);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Magic).apply(this, arguments));
    _this.routerCallback = _this.routerCallback.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.exitSubscriber = _this.exitSubscriber.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Magic, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return this.props.magicIndex !== nextProps.magicIndex;
    }
  }, {
    key: "componentWillLeave",
    value: function componentWillLeave(callback) {
      this.exitSubscription();
      this.routerCallback(callback);
    }
  }, {
    key: "routerCallback",
    value: function routerCallback(callback) {
      setTimeout(function () {
        return callback();
      }, 490);
    }
  }, {
    key: "exitSubscriber",
    value: function exitSubscriber(subscription) {
      this.exitSubscription = subscription;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          transition = _this$props.transition,
          transitionDuration = _this$props.transitionDuration,
          props = _objectWithoutProperties(_this$props, ["children", "transition", "transitionDuration"]); // eslint-disable-line no-unused-vars


      return React.createElement(MagicWrapper, {
        magicIndex: this.props.magicIndex,
        exitSubscription: this.exitSubscriber,
        presenter: props.presenter
      }, cloneElement(this.props.children[this.props.magicIndex], props) || null);
    }
  }]);

  return Magic;
}(Component);

export { Magic as default };
Magic.propTypes = {
  children: PropTypes.node,
  magicIndex: PropTypes.number,
  transition: PropTypes.array,
  transitionDuration: PropTypes.number
};
Magic.defaultProps = {
  magicIndex: 0
};