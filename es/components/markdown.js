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

import React, { createElement, Component } from 'react';
import PropTypes from 'prop-types';
import { getStyles } from '../utils/base';
import marksy from 'marksy';
import styled from 'react-emotion';
import BlockQuote from './block-quote';
import CodePane from './code-pane';
import Code from './code';
import Heading from './heading';
import Image from './image';
import Link from './link';
import List from './list';
import ListItem from './list-item';
import Quote from './quote';
import S from './s';
import Text from './text';
import Table from './table';
import TableHeader from './table-header';
import TableRow from './table-row';
import TableHeaderItem from './table-header-item';
import TableBody from './table-body';
import TableItem from './table-item';
var Container =
/*#__PURE__*/
styled("div", {
  target: "e1yizk7o0"
})(function (props) {
  return props.styles;
});

var _Heading = function _Heading(size) {
  var component = function component(_ref) {
    var children = _ref.children;
    return React.createElement(Heading, {
      size: size
    }, children);
  };

  component.propTypes = {
    children: PropTypes.node
  };
  return component;
};

var _S = function _S(type) {
  var component = function component(_ref2) {
    var children = _ref2.children;
    return React.createElement(S, {
      type: type
    }, children);
  };

  component.propTypes = {
    children: PropTypes.node
  };
  return component;
};

var _CombineBlockQuote = function _CombineBlockQuote(_ref3) {
  var children = _ref3.children;
  return React.createElement(BlockQuote, null, React.createElement(Quote, null, children));
};

_CombineBlockQuote.propTypes = {
  children: PropTypes.node
};

var _CodePane = function _CodePane(_ref4) {
  var language = _ref4.language,
      code = _ref4.code;
  return React.createElement(CodePane, {
    lang: language,
    source: code
  });
};

_CodePane.propTypes = {
  code: PropTypes.string,
  language: PropTypes.string
};
var compile = marksy({
  createElement: createElement,
  elements: {
    a: Link,
    blockquote: _CombineBlockQuote,
    code: _CodePane,
    del: _S('strikethrough'),
    em: _S('italic'),
    h1: _Heading(1),
    h2: _Heading(2),
    h3: _Heading(3),
    h4: _Heading(4),
    h5: _Heading(5),
    h6: _Heading(6),
    img: Image,
    codespan: Code,
    li: ListItem,
    p: Text,
    strong: _S('bold'),
    ul: List,
    table: Table,
    thead: TableHeader,
    th: TableHeaderItem,
    tbody: TableBody,
    tr: TableRow,
    td: TableItem
  }
});

var Markdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Markdown, _Component);

  function Markdown() {
    _classCallCheck(this, Markdown);

    return _possibleConstructorReturn(this, _getPrototypeOf(Markdown).apply(this, arguments));
  }

  _createClass(Markdown, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          style = _this$props.style,
          children = _this$props.children,
          source = _this$props.source;
      var styleComputed = [getStyles.call(this), style];

      if (source) {
        return React.createElement(Container, {
          styles: styleComputed
        }, compile(source).tree);
      }

      return React.createElement(Container, {
        styles: styleComputed
      }, compile(children).tree);
    }
  }]);

  return Markdown;
}(Component);

_defineProperty(Markdown, "propTypes", {
  children: PropTypes.node,
  source: PropTypes.string,
  style: PropTypes.object
});

_defineProperty(Markdown, "contextTypes", {
  styles: PropTypes.object,
  store: PropTypes.object,
  typeface: PropTypes.object
});

_defineProperty(Markdown, "defaultProps", {
  style: {}
});

export { Markdown as default };