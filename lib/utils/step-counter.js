"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepCounter = function stepCounter() {
  var frags = {};
  var slideIndex = 0;
  var setFragments = function setFragments(fragments, index) {
    frags = fragments;
    slideIndex = Number(index);
  };
  var getSteps = function getSteps() {
    var steps = (0, _keys2.default)(frags).reduce(function (previous, key) {
      return previous + (frags[key].visible === true);
    }, 0);
    return { steps: steps, slideIndex: slideIndex };
  };

  return {
    setFragments: setFragments,
    getSteps: getSteps
  };
};

exports.default = stepCounter;