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

var Notes =
/*#__PURE__*/
function (_Component) {
  _inherits(Notes, _Component);

  function Notes() {
    _classCallCheck(this, Notes);

    return _possibleConstructorReturn(this, _getPrototypeOf(Notes).apply(this, arguments));
  }

  _createClass(Notes, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$context = this.context,
          store = _this$context.store,
          parentSlide = _this$context.slideHash,
          updateNotes = _this$context.updateNotes;
      var currentSlide = store.getState().route.slide; // updateNotes is only defined when this component is wrapped in
      // a Presenter.
      // Also, the type of parentSlide is either string or number based
      // on the parent slide having an id or not.

      if (updateNotes && currentSlide === "".concat(parentSlide)) {
        updateNotes(this.props.children);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return false;
    }
  }]);

  return Notes;
}(Component);

_defineProperty(Notes, "propTypes", {
  children: PropTypes.node.isRequired
});

_defineProperty(Notes, "contextTypes", {
  store: PropTypes.object,
  slideHash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  updateNotes: PropTypes.func
});

export { Notes as default };