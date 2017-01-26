import isUndefined from "lodash/isUndefined";

export const getSlideByIndex = (children, slideReference, index) => {
  const reference = slideReference[index];
  let slide;
  if (isUndefined(reference.setIndex)) {
    slide = children[reference.rootIndex];
  } else {
    slide = children[reference.rootIndex].props.slides[reference.setIndex];
  }
  return slide;
};
