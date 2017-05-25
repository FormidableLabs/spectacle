import { Children } from 'react';
import isUndefined from 'lodash/isUndefined';
import reduce from 'lodash/reduce';

export const getSlideByIndex = (children, slideReference, index) => {
  children = Children.toArray(children);
  let slide;
  const reference = slideReference[index];
  if (reference) {
    if (isUndefined(reference.setIndex)) {
      slide = children[reference.rootIndex];
    } else {
      const setChildren = Children.toArray(children[reference.rootIndex].props.children);
      slide = setChildren[reference.setIndex];
    }
  }
  return slide;
};

export const countSlides = (children) => {
  return reduce(Children.toArray(children), (count, child) => {
    count += child.props.hasSlideChildren ? Children.toArray(child.props.children).length : 1;
    return count;
  }, 0);
};
