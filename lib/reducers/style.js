"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxActions = require("redux-actions");

var reducer = (0, _reduxActions.handleActions)({
  SET_GLOBAL_STYLE: function SET_GLOBAL_STYLE() {
    return Object.assign({}, {
      globalStyleSet: true
    });
  }
}, {
  globalStyleSet: false
});
var _default = reducer;
exports.default = _default;