'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countSlides = exports.isMagicSlide = exports.getRootIndex = exports.getSlideByIndex = undefined;

var _react = require('react');

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _reduce = require('lodash/reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSlideByIndex = exports.getSlideByIndex = function getSlideByIndex(children, slideReference, index) {
  children = _react.Children.toArray(children);
  var slide = void 0;
  var reference = slideReference[index];
  if (reference) {
    if (!(0, _isUndefined2.default)(reference.magicIndex)) {
      slide = (0, _react.cloneElement)(children[reference.rootIndex], {
        magicIndex: reference.magicIndex
      });
    } else if ((0, _isUndefined2.default)(reference.setIndex)) {
      slide = children[reference.rootIndex];
    } else {
      var setChildren = _react.Children.toArray(children[reference.rootIndex].props.children);
      slide = setChildren[reference.setIndex];
    }
  }
  return slide;
};

var getRootIndex = exports.getRootIndex = function getRootIndex(slideReference, index) {
  var reference = slideReference[index];
  return reference.rootIndex;
};

var isMagicSlide = exports.isMagicSlide = function isMagicSlide(slideReference, index) {
  var reference = slideReference[index];
  return !(0, _isUndefined2.default)(reference.magicIndex);
};

var countSlides = exports.countSlides = function countSlides(children) {
  return (0, _reduce2.default)(_react.Children.toArray(children), function (count, child) {
    count += child.props.hasSlideChildren ? _react.Children.toArray(child.props.children).length : 1;
    return count;
  }, 0);
};