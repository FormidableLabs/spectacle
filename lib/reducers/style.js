'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _reduxActions.handleActions)({
  SET_GLOBAL_STYLE: function SET_GLOBAL_STYLE() {
    return (0, _assign2.default)({}, { globalStyleSet: true });
  }
}, { globalStyleSet: false });

exports.default = reducer;