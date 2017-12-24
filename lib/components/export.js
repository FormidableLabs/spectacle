'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _slides = require('../utils/slides');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledExport = /*#__PURE__*/(0, _reactEmotion2.default)('div', {
  target: 'css-mp8hky0'
})('height:100%;width:100%;');

var Export = function (_Component) {
  (0, _inherits3.default)(Export, _Component);

  function Export() {
    (0, _classCallCheck3.default)(this, Export);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Export.prototype._renderSlides = function _renderSlides() {
    var _this2 = this;

    return this.props.slideReference.map(function (reference, index) {
      var slide = (0, _slides.getSlideByIndex)(_this2.props.slides, _this2.props.slideReference, index);
      return (0, _react.cloneElement)(slide, {
        key: index,
        slideIndex: index,
        export: _this2.props.route.params.indexOf('export') !== -1,
        print: _this2.props.route.params.indexOf('print') !== -1,
        transition: [],
        transitionIn: [],
        transitionOut: [],
        transitionDuration: 0
      });
    });
  };

  Export.prototype.render = function render() {
    return (0, _jsx3.default)(StyledExport, {}, void 0, this._renderSlides());
  };

  return Export;
}(_react.Component);

exports.default = Export;


Export.contextTypes = {
  styles: _propTypes2.default.object
};