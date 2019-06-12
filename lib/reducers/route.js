"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxActions = require("redux-actions");

var reducer = (0, _reduxActions.handleActions)({
  UPDATE_ROUTE: function UPDATE_ROUTE(state, action) {
    var _action$payload = action.payload,
        location = _action$payload.location,
        slideCount = _action$payload.slideCount;
    var slideHash = location.pathname.replace(/\//g, '');
    var slide;

    if (isNaN(parseInt(slide))) {
      slide = slideHash;
    } else {
      var proposedSlideIndex = parseInt(location.pathname.replace(/\//g, ''));
      var isWithinBounds = proposedSlideIndex < slideCount && proposedSlideIndex >= 0;
      slide = isWithinBounds ? proposedSlideIndex : 0;
    }

    return Object.assign({}, {
      slide: slide,
      params: location.search.replace('?', '').split('&')
    });
  }
}, {
  slide: null,
  params: []
});
var _default = reducer;
exports.default = _default;