'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _reduxActions = require('redux-actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _reduxActions.handleActions)({
  UPDATE_ROUTE: function UPDATE_ROUTE(state, action) {
    var _action$payload = action.payload,
        location = _action$payload.location,
        slideCount = _action$payload.slideCount;

    var slideHash = location.pathname.replace(/\//g, '');
    var slide = void 0;

    if (isNaN(parseInt(slide))) {
      slide = slideHash;
    } else {
      var proposedSlideIndex = parseInt(location.pathname.replace(/\//g, ''));
      var isWithinBounds = proposedSlideIndex < slideCount && proposedSlideIndex >= 0;
      slide = isWithinBounds ? proposedSlideIndex : 0;
    }

    return (0, _assign2.default)({}, {
      slide: slide,
      params: location.search.replace('?', '').split('&')
    });
  }
}, { slide: null, params: [] });

exports.default = reducer;