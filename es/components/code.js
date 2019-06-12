function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import styled from 'react-emotion';

var format = function format(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

var StyledCode =
/*#__PURE__*/
styled("code", {
  target: "eiwozqw0"
})(function (props) {
  return props.styles;
});

var Code =
/*#__PURE__*/
function (_Component) {
  _inherits(Code, _Component);

  function Code() {
    _classCallCheck(this, Code);

    return _possibleConstructorReturn(this, _getPrototypeOf(Code).apply(this, arguments));
  }

  _createClass(Code, [{
    key: "createMarkup",
    value: function createMarkup() {
      return {
        __html: Array.isArray(this.props.children) ? this.props.children.map(format) : format(this.props.children)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var styles = [this.context.styles.components.code, getStyles.call(this), this.props.style];
      return React.createElement(StyledCode, {
        className: this.props.className,
        styles: styles,
        dangerouslySetInnerHTML: this.createMarkup()
      });
    }
  }]);

  return Code;
}(Component);

export { Code as default };
Code.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};
Code.contextTypes = {
  styles: PropTypes.object,
  store: PropTypes.object
};