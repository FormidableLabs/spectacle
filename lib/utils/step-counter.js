"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var stepCounter = function stepCounter() {
  var frags = {};
  var slideIndex = 0;

  var setFragments = function setFragments(fragments, index) {
    frags = fragments;
    slideIndex = Number(index);
  };

  var getSteps = function getSteps() {
    var steps = Object.keys(frags).reduce(function (previous, key) {
      return previous + frags[key].animations.every(function (a) {
        return a === true;
      });
    }, 0);
    return {
      steps: steps,
      slideIndex: slideIndex
    };
  };

  return {
    setFragments: setFragments,
    getSteps: getSteps
  };
};

var _default = stepCounter;
exports.default = _default;