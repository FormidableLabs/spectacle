"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _fragment = _interopRequireDefault(require("./fragment"));

var _route = _interopRequireDefault(require("./route"));

var _style = _interopRequireDefault(require("./style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
  fragment: _fragment.default,
  route: _route.default,
  style: _style.default
});
var _default = rootReducer;
exports.default = _default;