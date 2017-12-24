'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _reduxActions.handleActions)({
  ADD_FRAGMENT: function ADD_FRAGMENT(state, action) {
    var _action$payload = action.payload,
        id = _action$payload.id,
        slide = _action$payload.slide;

    var s = (0, _assign2.default)({}, state);
    s.fragments[slide] = s.fragments[slide] || {};
    s.fragments[slide][id] = action.payload;
    return s;
  },
  UPDATE_FRAGMENT: function UPDATE_FRAGMENT(state, action) {
    var fragment = action.payload.fragment;

    var s = (0, _assign2.default)({}, state);
    s.fragments[fragment.slide][fragment.id].visible = action.payload.visible;
    return s;
  }
}, { fragments: {} });

exports.default = reducer;