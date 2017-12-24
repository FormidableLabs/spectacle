'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _jsx2 = require('babel-runtime/helpers/jsx');

var _jsx3 = _interopRequireDefault(_jsx2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _class2, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

var _deepObjectDiff = require('deep-object-diff');

var _magic = require('../utils/magic');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Deck = /*#__PURE__*/(0, _reactEmotion2.default)('div')(function () {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  };
});

var Context = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Context, _React$Component);

  function Context() {
    (0, _classCallCheck3.default)(this, Context);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  Context.prototype.getChildContext = function getChildContext() {
    return {
      contentHeight: this.props.context.contentHeight,
      contentWidth: this.props.context.contentWidth,
      export: this.props.context.export,
      overview: this.props.context.overview,
      print: this.props.context.print,
      store: this.props.context.store,
      styles: this.props.context.styles
    };
  };

  Context.prototype.render = function render() {
    return this.props.children;
  };

  return Context;
}(_react2.default.Component), _class.contextTypes = {
  contentHeight: _propTypes2.default.number,
  contentWidth: _propTypes2.default.number,
  export: _propTypes2.default.bool,
  overview: _propTypes2.default.bool,
  print: _propTypes2.default.bool,
  store: _propTypes2.default.object,
  styles: _propTypes2.default.object
}, _class.childContextTypes = {
  contentHeight: _propTypes2.default.number,
  contentWidth: _propTypes2.default.number,
  export: _propTypes2.default.bool,
  overview: _propTypes2.default.bool,
  print: _propTypes2.default.bool,
  store: _propTypes2.default.object,
  styles: _propTypes2.default.object
}, _temp);
var MagicText = (_temp2 = _class2 = function (_React$Component2) {
  (0, _inherits3.default)(MagicText, _React$Component2);

  function MagicText(props) {
    (0, _classCallCheck3.default)(this, MagicText);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component2.call(this, props));

    _this2.makePortal = function () {
      var p = document.createElement('div');
      p.id = 'portal';
      p.style.position = 'absolute';
      p.style.width = '100%';
      p.style.height = '100%';
      p.style.top = 0;
      p.style.left = 0;
      p.style.visibility = 'hidden';
      document.body.append(p);
      return p;
    };

    _this2.container = null;
    _this2.styleMap = {};
    _this2.lastPortalMap = {};
    _this2.portalMap = {};
    _this2.diffs = {};
    _this2.lastDiffs = null;
    _this2.state = {
      renderedChildren: props.children
    };
    return _this2;
  }

  MagicText.prototype.componentDidMount = function componentDidMount() {
    var _this3 = this;

    this.mounted = true;
    this.portal = document.getElementById('portal');
    if (!this.props.presenter) {
      this.container.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        easing: 'ease-in'
      });
      this.props.exitSubscription(function () {
        _this3.container.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 500,
          easing: 'ease-in'
        });
      });
    }
    if (!this.portal) {
      this.portal = this.makePortal();
    }
    _reactDom2.default.render((0, _jsx3.default)(Context, {
      context: this.context
    }, void 0, (0, _jsx3.default)(Deck, {}, void 0, this.props.children)), this.portal, function () {
      _this3.timeout = setTimeout(function () {
        var containerRoot = (0, _get2.default)(_this3.container, 'childNodes[0]');
        var portalRoot = (0, _get2.default)(_this3.portal, 'childNodes[0].childNodes[0]');
        if (containerRoot && portalRoot) {
          (0, _magic.updateChildren)(containerRoot);
          (0, _magic.updateChildren)(portalRoot);
          (0, _magic.buildStyleMap)(_this3.portalMap, portalRoot);
        }
      }, 300);
    });
  };

  MagicText.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this4 = this;

    if (this.props.magicIndex === nextProps.magicIndex) {
      return;
    }
    _reactDom2.default.render((0, _jsx3.default)(Context, {
      context: this.context
    }, void 0, (0, _jsx3.default)(Deck, {}, void 0, nextProps.children)), this.portal, function () {
      var styles = {};
      var portalRoot = (0, _get2.default)(_this4.portal, 'childNodes[0].childNodes[0]');
      if (portalRoot) {
        (0, _magic.updateChildren)(portalRoot);
        (0, _magic.buildStyleMap)(styles, portalRoot);
        _this4.diffs = (0, _deepObjectDiff.detailedDiff)(_this4.portalMap, styles);
        _this4.lastPortalMap = _this4.portalMap;
        _this4.portalMap = styles;
        if (_this4.mounted) {
          _this4.setState({
            renderedChildren: nextProps.children
          }, function () {
            _this4.forceUpdate();
          });
        }
      }
    });
  };

  MagicText.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
    return false;
  };

  MagicText.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this5 = this;

    var containerRoot = (0, _get2.default)(this.container, 'childNodes[0]');
    if (containerRoot) {
      (0, _magic.updateChildren)(containerRoot);
    }
    if (this.diffs.added) {
      (0, _keys2.default)(this.diffs.added).forEach(function (m) {
        var el = document.querySelector('[data-key=\'' + m + '\']');
        if (el) {
          el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 500,
            easing: 'ease-in'
          });
        }
      });
    }
    if (this.diffs.updated) {
      (0, _keys2.default)(this.diffs.updated).forEach(function (m) {
        var props = (0, _extends3.default)({}, _this5.diffs.added[m] || {}, _this5.diffs.updated[m] || {});
        var last = (0, _extends3.default)({}, _this5.lastPortalMap[m] || {});
        if (last) {
          var start = {};
          var end = {};
          var xdiff = props.x - last.x || 0;
          var ydiff = props.y - last.y || 0;
          start.transform = 'translate(' + xdiff * -1 + 'px, ' + ydiff * -1 + 'px)';
          end.transform = 'translate(0, 0)';
          var el = document.querySelector('[data-key=\'' + m + '\']');
          if (el && !el.classList.contains('spectacle-content')) {
            el.animate([start, end], {
              duration: 500,
              easing: 'ease-in'
            });
          }
        }
      });
    }
    this.lastDiffs = this.diffs;
  };

  MagicText.prototype.componentWillUnmount = function componentWillUnmount() {
    clearTimeout(this.timeout);
    this.mounted = false;
  };

  MagicText.prototype.render = function render() {
    var _this6 = this;

    return _react2.default.createElement(
      'div',
      {
        style: {
          height: '100%',
          width: '100%'
        },
        ref: function ref(c) {
          _this6.container = c;
        }
      },
      this.state.renderedChildren
    );
  };

  return MagicText;
}(_react2.default.Component), _class2.contextTypes = {
  contentHeight: _propTypes2.default.number,
  contentWidth: _propTypes2.default.number,
  export: _propTypes2.default.bool,
  overview: _propTypes2.default.bool,
  print: _propTypes2.default.bool,
  store: _propTypes2.default.object,
  styles: _propTypes2.default.object
}, _temp2);
exports.default = MagicText;