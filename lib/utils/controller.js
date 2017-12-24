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

var _createHashHistory = require('history/createHashHistory');

var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _actions = require('../actions');

var _slides = require('./slides');

var _default = require('../themes/default');

var _default2 = _interopRequireDefault(_default);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createHashHistory2.default)();

var Controller = function (_Component) {
  (0, _inherits3.default)(Controller, _Component);

  function Controller(props) {
    (0, _classCallCheck3.default)(this, Controller);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = {
      print: false
    };


    _this.history = props.history || history;
    return _this;
  }

  Controller.prototype.componentDidMount = function componentDidMount() {
    this.unlisten = this.history.listen(this._updateRoute.bind(this));
    var location = this.history.location;
    var slideCount = (0, _slides.countSlides)(this.props.children.props.children);
    this.props.store.dispatch((0, _actions.updateRoute)({
      location: location,
      slideCount: slideCount
    }));
  };

  Controller.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  };

  Controller.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unlisten();
  };

  Controller.prototype._updateRoute = function _updateRoute(location) {
    var _this2 = this;

    this.setState({
      print: location.search.indexOf('print') !== -1
    }, function () {
      var slideCount = (0, _slides.countSlides)(_this2.props.children.props.children);
      _this2.props.store.dispatch((0, _actions.updateRoute)({
        location: location,
        slideCount: slideCount
      }));
    });
  };

  Controller.prototype.render = function render() {
    var styles = this.props.theme ? this.props.theme : (0, _default2.default)();

    return (0, _jsx3.default)(_context2.default, {
      store: this.props.store,
      history: this.history,
      styles: this.state.print ? styles.print : styles.screen
    }, void 0, this.props.children);
  };

  return Controller;
}(_react.Component);

exports.default = Controller;