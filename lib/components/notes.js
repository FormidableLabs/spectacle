'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notes = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(Notes, _Component);

  function Notes() {
    (0, _classCallCheck3.default)(this, Notes);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  Notes.prototype.componentWillMount = function componentWillMount() {
    var _context = this.context,
        store = _context.store,
        parentSlide = _context.slideHash,
        updateNotes = _context.updateNotes;

    var currentSlide = store.getState().route.slide;

    // updateNotes is only defined when this component is wrapped in
    // a Presenter.
    // Also, the type of parentSlide is either string or number based
    // on the parent slide having an id or not.
    if (updateNotes && currentSlide === '' + parentSlide) {
      updateNotes(this.props.children);
    }
  };

  Notes.prototype.render = function render() {
    return false;
  };

  return Notes;
}(_react.Component), _class.contextTypes = {
  store: _propTypes2.default.object,
  slideHash: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  updateNotes: _propTypes2.default.func
}, _temp);
exports.default = Notes;