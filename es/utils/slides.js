import { cloneElement, Children } from 'react';
import isUndefined from 'lodash/isUndefined';
import reduce from 'lodash/reduce';
import Notes from '../components/notes';
export var getNotesForSlide = function getNotesForSlide(slide) {
  var notes = '';
  Children.map(slide.props.children, function (child) {
    var isChildNode = child.type === Notes;

    if (isChildNode) {
      notes = child.props.children;
    }
  });
  return notes;
};
export var getSlideByIndex = function getSlideByIndex(children, slideReference, index) {
  children = Children.toArray(children);
  var slide;
  var reference = slideReference[index];

  if (reference) {
    if (!isUndefined(reference.magicIndex)) {
      slide = cloneElement(children[reference.rootIndex], {
        magicIndex: reference.magicIndex
      });
    } else if (isUndefined(reference.setIndex)) {
      slide = children[reference.rootIndex];
    } else {
      var setChildren = Children.toArray(children[reference.rootIndex].props.children);
      var style = children[reference.rootIndex].props.style;
      slide = cloneElement(setChildren[reference.setIndex], {
        style: style
      });
    }
  }

  return slide;
};
export var getRootIndex = function getRootIndex(slideReference, index) {
  var reference = slideReference[index];
  return reference.rootIndex;
};
export var isMagicSlide = function isMagicSlide(slideReference, index) {
  var reference = slideReference[index];
  return !isUndefined(reference.magicIndex);
};
export var countSlides = function countSlides(children) {
  return reduce(Children.toArray(children), function (count, child) {
    count += child.props.hasSlideChildren ? Children.toArray(child.props.children).length : 1;
    return count;
  }, 0);
};