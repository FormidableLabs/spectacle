function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { detailedDiff } from 'deep-object-diff';
import { buildStyleMap, updateChildren } from '../utils/magic';
import get from 'lodash/get';
var Deck =
/*#__PURE__*/
styled("div", {
  target: "e1sel6ae0"
})(function () {
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  };
});

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
      return {
        contentHeight: this.props.context.contentHeight,
        contentWidth: this.props.context.contentWidth,
        export: this.props.context.export,
        overview: this.props.context.overview,
        print: this.props.context.print,
        store: this.props.context.store,
        styles: this.props.context.styles
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

_defineProperty(Context, "propTypes", {
  children: PropTypes.node,
  context: PropTypes.object
});

_defineProperty(Context, "contextTypes", {
  contentHeight: PropTypes.number,
  contentWidth: PropTypes.number,
  export: PropTypes.bool,
  overview: PropTypes.bool,
  print: PropTypes.bool,
  store: PropTypes.object,
  styles: PropTypes.object
});

_defineProperty(Context, "childContextTypes", {
  contentHeight: PropTypes.number,
  contentWidth: PropTypes.number,
  export: PropTypes.bool,
  overview: PropTypes.bool,
  print: PropTypes.bool,
  store: PropTypes.object,
  styles: PropTypes.object
});

var MagicText =
/*#__PURE__*/
function (_Component2) {
  _inherits(MagicText, _Component2);

  function MagicText(props) {
    var _this;

    _classCallCheck(this, MagicText);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MagicText).apply(this, arguments));
    _this.container = null;
    _this.styleMap = {};
    _this.lastPortalMap = {};
    _this.portalMap = {};
    _this.diffs = {};
    _this.lastDiffs = null;
    _this.makePortal = _this.makePortal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.state = {
      renderedChildren: props.children
    };
    return _this;
  }

  _createClass(MagicText, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      this.portal = document.getElementById('portal');

      if (!this.props.presenter) {
        this.container.animate([{
          opacity: 0
        }, {
          opacity: 1
        }], {
          duration: 500,
          easing: 'ease-in'
        });
        this.props.exitSubscription(function () {
          _this2.container.animate([{
            opacity: 1
          }, {
            opacity: 0
          }], {
            duration: 500,
            easing: 'ease-in'
          });
        });
      }

      if (!this.portal) {
        this.portal = this.makePortal();
      }

      ReactDOM.render(React.createElement(Context, {
        context: this.context
      }, React.createElement(Deck, null, this.props.children)), this.portal, function () {
        _this2.timeout = setTimeout(function () {
          var containerRoot = get(_this2.container, 'childNodes[0]');
          var portalRoot = get(_this2.portal, 'childNodes[0].childNodes[0]');

          if (containerRoot && portalRoot) {
            updateChildren(containerRoot);
            updateChildren(portalRoot);
            buildStyleMap(_this2.portalMap, portalRoot);
          }
        }, 300);
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this3 = this;

      var containerRoot = get(this.container, 'childNodes[0]');

      if (containerRoot) {
        updateChildren(containerRoot);
      }

      if (this.diffs.added) {
        Object.keys(this.diffs.added).forEach(function (m) {
          var el = document.querySelector("[data-key='".concat(m, "']"));

          if (el) {
            el.animate([{
              opacity: 0
            }, {
              opacity: 1
            }], {
              duration: 500,
              easing: 'ease-in'
            });
          }
        });
      }

      if (this.diffs.updated) {
        Object.keys(this.diffs.updated).forEach(function (m) {
          var properties = _objectSpread({}, _this3.diffs.added[m] || {}, _this3.diffs.updated[m] || {});

          var last = _objectSpread({}, _this3.lastPortalMap[m] || {});

          if (last) {
            var start = {};
            var end = {};
            var xdiff = properties.x - last.x || 0;
            var ydiff = properties.y - last.y || 0;
            start.transform = "translate(".concat(xdiff * -1, "px, ").concat(ydiff * -1, "px)");
            end.transform = 'translate(0, 0)';
            var el = document.querySelector("[data-key='".concat(m, "']"));

            if (el && !el.classList.contains('spectacle-content')) {
              el.animate([start, end], {
                duration: 500,
                easing: 'ease-in'
              });
            }
          }
        });
      }

      if (this.props.magicIndex !== prevProps.magicIndex) {
        ReactDOM.render(React.createElement(Context, {
          context: this.context
        }, React.createElement(Deck, null, this.props.children)), this.portal, function () {
          var styles = {};
          var portalRoot = get(_this3.portal, 'childNodes[0].childNodes[0]');

          if (portalRoot) {
            updateChildren(portalRoot);
            buildStyleMap(styles, portalRoot);
            _this3.diffs = detailedDiff(_this3.portalMap, styles);
            _this3.lastPortalMap = _this3.portalMap;
            _this3.portalMap = styles;

            if (_this3.mounted) {
              _this3.setState({
                renderedChildren: _this3.props.children
              }, function () {
                _this3.forceUpdate();
              });
            }
          }
        });
      }

      this.lastDiffs = this.diffs;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearTimeout(this.timeout);
      this.mounted = false;
    }
  }, {
    key: "makePortal",
    value: function makePortal() {
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
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement("div", {
        style: {
          height: '100%',
          width: '100%'
        },
        ref: function ref(c) {
          _this4.container = c;
        }
      }, this.state.renderedChildren);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return nextProps.magicIndex !== prevState.magicIndex ? {
        magicIndex: nextProps.magicIndex
      } : null;
    }
  }]);

  return MagicText;
}(Component);

_defineProperty(MagicText, "propTypes", {
  children: PropTypes.node,
  exitSubscription: PropTypes.func,
  magicIndex: PropTypes.number,
  presenter: PropTypes.bool
});

_defineProperty(MagicText, "contextTypes", {
  contentHeight: PropTypes.number,
  contentWidth: PropTypes.number,
  export: PropTypes.bool,
  overview: PropTypes.bool,
  print: PropTypes.bool,
  store: PropTypes.object,
  styles: PropTypes.object
});

export { MagicText as default };