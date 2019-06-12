"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _base = require("../utils/base");

var _marksy = _interopRequireDefault(require("marksy"));

var _reactEmotion = _interopRequireDefault(require("react-emotion"));

var _blockQuote = _interopRequireDefault(require("./block-quote"));

var _codePane = _interopRequireDefault(require("./code-pane"));

var _code = _interopRequireDefault(require("./code"));

var _heading = _interopRequireDefault(require("./heading"));

var _image = _interopRequireDefault(require("./image"));

var _link = _interopRequireDefault(require("./link"));

var _list = _interopRequireDefault(require("./list"));

var _listItem = _interopRequireDefault(require("./list-item"));

var _quote = _interopRequireDefault(require("./quote"));

var _s = _interopRequireDefault(require("./s"));

var _text = _interopRequireDefault(require("./text"));

var _table = _interopRequireDefault(require("./table"));

var _tableHeader = _interopRequireDefault(require("./table-header"));

var _tableRow = _interopRequireDefault(require("./table-row"));

var _tableHeaderItem = _interopRequireDefault(require("./table-header-item"));

var _tableBody = _interopRequireDefault(require("./table-body"));

var _tableItem = _interopRequireDefault(require("./table-item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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

var Container =
/*#__PURE__*/
(0, _reactEmotion.default)("div", {
  target: "e1yizk7o0"
})(function (props) {
  return props.styles;
});

var _Heading = function _Heading(size) {
  var component = function component(_ref) {
    var children = _ref.children;
    return _react.default.createElement(_heading.default, {
      size: size
    }, children);
  };

  component.propTypes = {
    children: _propTypes.default.node
  };
  return component;
};

var _S = function _S(type) {
  var component = function component(_ref2) {
    var children = _ref2.children;
    return _react.default.createElement(_s.default, {
      type: type
    }, children);
  };

  component.propTypes = {
    children: _propTypes.default.node
  };
  return component;
};

var _CombineBlockQuote = function _CombineBlockQuote(_ref3) {
  var children = _ref3.children;
  return _react.default.createElement(_blockQuote.default, null, _react.default.createElement(_quote.default, null, children));
};

_CombineBlockQuote.propTypes = {
  children: _propTypes.default.node
};

var _CodePane = function _CodePane(_ref4) {
  var language = _ref4.language,
      code = _ref4.code;
  return _react.default.createElement(_codePane.default, {
    lang: language,
    source: code
  });
};

_CodePane.propTypes = {
  code: _propTypes.default.string,
  language: _propTypes.default.string
};
var compile = (0, _marksy.default)({
  createElement: _react.createElement,
  elements: {
    a: _link.default,
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
    img: _image.default,
    codespan: _code.default,
    li: _listItem.default,
    p: _text.default,
    strong: _S('bold'),
    ul: _list.default,
    table: _table.default,
    thead: _tableHeader.default,
    th: _tableHeaderItem.default,
    tbody: _tableBody.default,
    tr: _tableRow.default,
    td: _tableItem.default
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
      var styleComputed = [_base.getStyles.call(this), style];

      if (source) {
        return _react.default.createElement(Container, {
          styles: styleComputed
        }, compile(source).tree);
      }

      return _react.default.createElement(Container, {
        styles: styleComputed
      }, compile(children).tree);
    }
  }]);

  return Markdown;
}(_react.Component);

exports.default = Markdown;

_defineProperty(Markdown, "propTypes", {
  children: _propTypes.default.node,
  source: _propTypes.default.string,
  style: _propTypes.default.object
});

_defineProperty(Markdown, "contextTypes", {
  styles: _propTypes.default.object,
  store: _propTypes.default.object,
  typeface: _propTypes.default.object
});

_defineProperty(Markdown, "defaultProps", {
  style: {}
});