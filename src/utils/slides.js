import { cloneElement, Children } from 'react';
import isUndefined from 'lodash/isUndefined';
import reduce from 'lodash/reduce';
import Notes from '../components/notes';

export const getNotesForSlide = slide => {
  let notes = '';
  Children.map(slide.props.children, child => {
    const isChildNode = child.type === Notes;
    if (isChildNode) {
      notes = child.props.children;
    }
  });

  return notes;
};

export const getSlideByIndex = (children, slideReference, index) => {
  children = Children.toArray(children);
  let slide;
  const reference = slideReference[index];
  if (reference) {
    if (!isUndefined(reference.magicIndex)) {
      slide = cloneElement(children[reference.rootIndex], {
        magicIndex: reference.magicIndex
      });
    } else if (isUndefined(reference.setIndex)) {
      slide = children[reference.rootIndex];
    } else {
      const setChildren = Children.toArray(
        children[reference.rootIndex].props.children
      );
      const style = children[reference.rootIndex].props.style;
      slide = cloneElement(setChildren[reference.setIndex], {
        style
      });
    }
  }
  return slide;
};

export const getRootIndex = (slideReference, index) => {
  const reference = slideReference[index];
  return reference.rootIndex;
};

export const isMagicSlide = (slideReference, index) => {
  const reference = slideReference[index];
  return !isUndefined(reference.magicIndex);
};

export const countSlides = children => {
  return reduce(
    Children.toArray(children),
    (count, child) => {
      count += child.props.hasSlideChildren
        ? Children.toArray(child.props.children).length
        : 1;
      return count;
    },
    0
  );
};
