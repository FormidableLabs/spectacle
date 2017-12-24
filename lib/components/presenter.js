'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _slides = require('../utils/slides');

var _presenterComponents = require('./presenter-components');

var _time = require('./time');

var _time2 = _interopRequireDefault(_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = (0, _jsx3.default)(_presenterComponents.EndHeader, {}, void 0, 'END');

var Presenter = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(Presenter, _Component);

  function Presenter() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Presenter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      notes: {}
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  Presenter.prototype.getChildContext = function getChildContext() {
    return {
      updateNotes: this.updateNotes.bind(this)
    };
  };

  Presenter.prototype.getCurrentSlide = function getCurrentSlide() {
    return this.context.store.getState().route.slide;
  };

  Presenter.prototype.updateNotes = function updateNotes(newNotes) {
    var slide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var notes = (0, _extends3.default)({}, this.state.notes);
    notes[slide || this.getCurrentSlide()] = newNotes;

    this.setState({ notes: notes });
  };

  Presenter.prototype._getSlideByIndex = function _getSlideByIndex(index) {
    return (0, _slides.getSlideByIndex)(_react.Children.toArray(this.props.slides), this.props.slideReference, index);
  };

  Presenter.prototype._renderMainSlide = function _renderMainSlide() {
    var _props = this.props,
        slideIndex = _props.slideIndex,
        hash = _props.hash,
        lastSlideIndex = _props.lastSlideIndex;

    var child = this._getSlideByIndex(slideIndex);
    var presenterStyle = {
      position: 'relative'
    };
    return (0, _react.cloneElement)(child, {
      dispatch: this.props.dispatch,
      key: slideIndex,
      hash: hash,
      export: this.props.route.params.indexOf('export') !== -1,
      print: this.props.route.params.indexOf('print') !== -1,
      slideIndex: slideIndex,
      lastSlideIndex: lastSlideIndex,
      transition: [],
      transitionIn: [],
      transitionOut: [],
      transitionDuration: 0,
      presenter: true,
      presenterStyle: presenterStyle
    });
  };

  Presenter.prototype._renderNextSlide = function _renderNextSlide() {
    var _props2 = this.props,
        slideIndex = _props2.slideIndex,
        lastSlideIndex = _props2.lastSlideIndex;

    var presenterStyle = {
      position: 'relative'
    };
    var child = this._getSlideByIndex(slideIndex + 1);
    return child ? (0, _react.cloneElement)(child, {
      dispatch: this.props.dispatch,
      export: this.props.route.params.indexOf('export') !== -1,
      print: this.props.route.params.indexOf('print') !== -1,
      key: slideIndex + 1,
      hash: child.props.id || slideIndex + 1,
      slideIndex: slideIndex + 1,
      lastSlideIndex: lastSlideIndex,
      transition: [],
      transitionIn: [],
      transitionOut: [],
      transitionDuration: 0,
      presenterStyle: presenterStyle,
      presenter: true,
      appearOff: true
    }) : _ref;
  };

  Presenter.prototype._renderNotes = function _renderNotes() {
    var notes = void 0;
    var currentSlide = this.getCurrentSlide();

    if (this.state.notes[currentSlide]) {
      notes = this.state.notes[currentSlide];
    } else {
      var child = this._getSlideByIndex(this.props.slideIndex);
      notes = child.props.notes;
    }

    if (!notes) {
      return false;
    }

    if (typeof notes === 'string') {
      return (0, _jsx3.default)('div', {
        dangerouslySetInnerHTML: { __html: notes }
      });
    }
    return (0, _jsx3.default)('div', {}, void 0, notes);
  };

  Presenter.prototype.render = function render() {
    return (0, _jsx3.default)(_presenterComponents.PresenterContent, {}, void 0, (0, _jsx3.default)(_presenterComponents.HeaderContainer, {}, void 0, (0, _jsx3.default)(_presenterComponents.SlideInfo, {}, void 0, 'Slide ', this.props.slideIndex + 1, ' of', ' ', this.props.slideReference.length), (0, _jsx3.default)(_time2.default, {
      timer: this.props.timer
    })), (0, _jsx3.default)(_presenterComponents.ContentContainer, {}, void 0, (0, _jsx3.default)(_presenterComponents.PreviewPane, {}, void 0, (0, _jsx3.default)(_presenterComponents.PreviewCurrentSlide, {
      className: 'spectacle-presenter-main'
    }, void 0, this._renderMainSlide()), (0, _jsx3.default)(_presenterComponents.PreviewNextSlide, {}, void 0, this._renderNextSlide())), (0, _jsx3.default)(_presenterComponents.Notes, {}, void 0, this._renderNotes())));
  };

  return Presenter;
}(_react.Component), _class.childContextTypes = {
  updateNotes: _propTypes2.default.func
}, _temp2);
exports.default = Presenter;


Presenter.contextTypes = {
  styles: _propTypes2.default.object,
  store: _propTypes2.default.object.isRequired
};