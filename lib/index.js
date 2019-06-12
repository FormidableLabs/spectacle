"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Anim", {
  enumerable: true,
  get: function get() {
    return _anim.default;
  }
});
Object.defineProperty(exports, "Appear", {
  enumerable: true,
  get: function get() {
    return _appear.default;
  }
});
Object.defineProperty(exports, "BlockQuote", {
  enumerable: true,
  get: function get() {
    return _blockQuote.default;
  }
});
Object.defineProperty(exports, "Cite", {
  enumerable: true,
  get: function get() {
    return _cite.default;
  }
});
Object.defineProperty(exports, "CodePane", {
  enumerable: true,
  get: function get() {
    return _codePane.default;
  }
});
Object.defineProperty(exports, "Code", {
  enumerable: true,
  get: function get() {
    return _code.default;
  }
});
Object.defineProperty(exports, "ComponentPlayground", {
  enumerable: true,
  get: function get() {
    return _componentPlayground.default;
  }
});
Object.defineProperty(exports, "Deck", {
  enumerable: true,
  get: function get() {
    return _deck.default;
  }
});
Object.defineProperty(exports, "Fill", {
  enumerable: true,
  get: function get() {
    return _fill.Fill;
  }
});
Object.defineProperty(exports, "Fit", {
  enumerable: true,
  get: function get() {
    return _fit.Fit;
  }
});
Object.defineProperty(exports, "Heading", {
  enumerable: true,
  get: function get() {
    return _heading.default;
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function get() {
    return _image.default;
  }
});
Object.defineProperty(exports, "GoToAction", {
  enumerable: true,
  get: function get() {
    return _goToAction.default;
  }
});
Object.defineProperty(exports, "Layout", {
  enumerable: true,
  get: function get() {
    return _layout.default;
  }
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function get() {
    return _link.default;
  }
});
Object.defineProperty(exports, "ListItem", {
  enumerable: true,
  get: function get() {
    return _listItem.default;
  }
});
Object.defineProperty(exports, "List", {
  enumerable: true,
  get: function get() {
    return _list.default;
  }
});
Object.defineProperty(exports, "Magic", {
  enumerable: true,
  get: function get() {
    return _magic.default;
  }
});
Object.defineProperty(exports, "Markdown", {
  enumerable: true,
  get: function get() {
    return _markdown.default;
  }
});
Object.defineProperty(exports, "MarkdownSlides", {
  enumerable: true,
  get: function get() {
    return _markdownSlides.default;
  }
});
Object.defineProperty(exports, "Notes", {
  enumerable: true,
  get: function get() {
    return _notes.default;
  }
});
Object.defineProperty(exports, "Quote", {
  enumerable: true,
  get: function get() {
    return _quote.default;
  }
});
Object.defineProperty(exports, "S", {
  enumerable: true,
  get: function get() {
    return _s.default;
  }
});
Object.defineProperty(exports, "Slide", {
  enumerable: true,
  get: function get() {
    return _slide.default;
  }
});
Object.defineProperty(exports, "SlideSet", {
  enumerable: true,
  get: function get() {
    return _slideSet.default;
  }
});
Object.defineProperty(exports, "TableBody", {
  enumerable: true,
  get: function get() {
    return _tableBody.default;
  }
});
Object.defineProperty(exports, "TableHeader", {
  enumerable: true,
  get: function get() {
    return _tableHeader.default;
  }
});
Object.defineProperty(exports, "TableHeaderItem", {
  enumerable: true,
  get: function get() {
    return _tableHeaderItem.default;
  }
});
Object.defineProperty(exports, "TableItem", {
  enumerable: true,
  get: function get() {
    return _tableItem.default;
  }
});
Object.defineProperty(exports, "TableRow", {
  enumerable: true,
  get: function get() {
    return _tableRow.default;
  }
});
Object.defineProperty(exports, "Table", {
  enumerable: true,
  get: function get() {
    return _table.default;
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function get() {
    return _text.default;
  }
});
Object.defineProperty(exports, "Typeface", {
  enumerable: true,
  get: function get() {
    return _typeface.default;
  }
});
exports.themes = void 0;

var _anim = _interopRequireDefault(require("./components/anim"));

var _appear = _interopRequireDefault(require("./components/appear"));

var _blockQuote = _interopRequireDefault(require("./components/block-quote"));

var _cite = _interopRequireDefault(require("./components/cite"));

var _codePane = _interopRequireDefault(require("./components/code-pane"));

var _code = _interopRequireDefault(require("./components/code"));

var _componentPlayground = _interopRequireDefault(require("./components/component-playground"));

var _deck = _interopRequireDefault(require("./components/deck"));

var _fill = require("./components/fill");

var _fit = require("./components/fit");

var _heading = _interopRequireDefault(require("./components/heading"));

var _image = _interopRequireDefault(require("./components/image"));

var _goToAction = _interopRequireDefault(require("./components/go-to-action"));

var _layout = _interopRequireDefault(require("./components/layout"));

var _link = _interopRequireDefault(require("./components/link"));

var _listItem = _interopRequireDefault(require("./components/list-item"));

var _list = _interopRequireDefault(require("./components/list"));

var _magic = _interopRequireDefault(require("./components/magic"));

var _markdown = _interopRequireDefault(require("./components/markdown"));

var _markdownSlides = _interopRequireDefault(require("./components/markdown-slides"));

var _notes = _interopRequireDefault(require("./components/notes"));

var _quote = _interopRequireDefault(require("./components/quote"));

var _s = _interopRequireDefault(require("./components/s"));

var _slide = _interopRequireDefault(require("./components/slide"));

var _slideSet = _interopRequireDefault(require("./components/slide-set"));

var _tableBody = _interopRequireDefault(require("./components/table-body"));

var _tableHeader = _interopRequireDefault(require("./components/table-header"));

var _tableHeaderItem = _interopRequireDefault(require("./components/table-header-item"));

var _tableItem = _interopRequireDefault(require("./components/table-item"));

var _tableRow = _interopRequireDefault(require("./components/table-row"));

var _table = _interopRequireDefault(require("./components/table"));

var _text = _interopRequireDefault(require("./components/text"));

var _typeface = _interopRequireDefault(require("./components/typeface"));

var _default = _interopRequireDefault(require("./themes/default"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var themes = {
  // Rename from `default` to `defaultTheme` to avoid keyword issues.
  defaultTheme: _default.default
};
exports.themes = themes;