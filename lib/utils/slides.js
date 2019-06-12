"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countSlides = exports.isMagicSlide = exports.getRootIndex = exports.getSlideByIndex = exports.getNotesForSlide = void 0;

var _react = require("react");

var _isUndefined = _interopRequireDefault(require("lodash/isUndefined"));

var _reduce = _interopRequireDefault(require("lodash/reduce"));

var _notes = _interopRequireDefault(require("../components/notes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getNotesForSlide = function getNotesForSlide(slide) {
  var notes = '';

  _react.Children.map(slide.props.children, function (child) {
    var isChildNode = child.type === _notes.default;

    if (isChildNode) {
      notes = child.props.children;
    }
  });

  return notes;
};

exports.getNotesForSlide = getNotesForSlide;

var getSlideByIndex = function getSlideByIndex(children, slideReference, index) {
  children = _react.Children.toArray(children);
  var slide;
  var reference = slideReference[index];

  if (reference) {
    if (!(0, _isUndefined.default)(reference.magicIndex)) {
      slide = (0, _react.cloneElement)(children[reference.rootIndex], {
        magicIndex: reference.magicIndex
      });
    } else if ((0, _isUndefined.default)(reference.setIndex)) {
      slide = children[reference.rootIndex];
    } else {
      var setChildren = _react.Children.toArray(children[reference.rootIndex].props.children);

      var style = children[reference.rootIndex].props.style;
      slide = (0, _react.cloneElement)(setChildren[reference.setIndex], {
        style: style
      });
    }
  }

  return slide;
};

exports.getSlideByIndex = getSlideByIndex;

var getRootIndex = function getRootIndex(slideReference, index) {
  var reference = slideReference[index];
  return reference.rootIndex;
};

exports.getRootIndex = getRootIndex;

var isMagicSlide = function isMagicSlide(slideReference, index) {
  var reference = slideReference[index];
  return !(0, _isUndefined.default)(reference.magicIndex);
};

exports.isMagicSlide = isMagicSlide;

var countSlides = function countSlides(children) {
  return (0, _reduce.default)(_react.Children.toArray(children), function (count, child) {
    count += child.props.hasSlideChildren ? _react.Children.toArray(child.props.children).length : 1;
    return count;
  }, 0);
};

exports.countSlides = countSlides;