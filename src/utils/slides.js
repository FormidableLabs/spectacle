import { Children } from "react";
import isUndefined from "lodash/isUndefined";
import reduce from "lodash/reduce";

export const getSlideByIndex = (children, slideReference, index) => {
  children = Children.toArray(children);
  const reference = slideReference[index];
  let slide;
  if (isUndefined(reference.setIndex)) {
    slide = children[reference.rootIndex];
  } else {
    slide = children[reference.rootIndex].props.slides[reference.setIndex];
  }
  return slide;
};

export const countSlides = (children) => {
  return reduce(Children.toArray(children), (count, child) => {
    count += child.props.hasSlideChildren ? child.props.slides.length : 1;
    return count;
  }, 0);
};
