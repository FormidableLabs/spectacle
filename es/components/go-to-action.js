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
import isFunction from 'lodash/isFunction';
var GoToActionButton =
/*#__PURE__*/
styled("button", {
  target: "efsvrgm0"
})(function (_ref) {
  var styles = _ref.styles;
  return [styles.context, styles.base, styles.user];
});

var GoToAction =
/*#__PURE__*/
function (_Component) {
  _inherits(GoToAction, _Component);

  function GoToAction() {
    _classCallCheck(this, GoToAction);

    return _possibleConstructorReturn(this, _getPrototypeOf(GoToAction).apply(this, arguments));
  }

  _createClass(GoToAction, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          render = _this$props.render,
          children = _this$props.children,
          style = _this$props.style,
          slide = _this$props.slide,
          goToSlide = this.context.goToSlide;

      if (render && isFunction(render)) {
        return render(goToSlide);
      } else if (slide) {
        return React.createElement(GoToActionButton, {
          onClick: function onClick() {
            return goToSlide(slide);
          },
          styles: {
            context: this.context.styles.components.goToAction,
            base: getStyles.call(this),
            user: style
          }
        }, children);
      } // eslint-disable-next-line no-console


      console.warn('<GoToAction /> must have a render or slide prop.');
      return React.createElement("div", null);
    }
  }]);

  return GoToAction;
}(Component);

GoToAction.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func,
  slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object
};
GoToAction.contextTypes = {
  styles: PropTypes.object,
  goToSlide: PropTypes.func
};
export default GoToAction;