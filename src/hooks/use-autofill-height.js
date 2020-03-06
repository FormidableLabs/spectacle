import * as React from 'react';

const getNodeFullHeight = node => {
  const style = getComputedStyle(node);
  let nextSiblingMarginTop = 0;
  if (node.nextSibling) {
    nextSiblingMarginTop = parseFloat(
      getComputedStyle(node.nextSibling).marginTop
    );
  }
  const height =
    node.offsetHeight +
    parseFloat(style.marginTop) -
    nextSiblingMarginTop +
    parseFloat(style.marginBottom);
  return height;
};

const isCurrentNodeAutoFill = current =>
  current.classList.contains('spectacle-auto-height-fill') ||
  (current.tagName.toLowerCase().includes('pre') &&
    current.childNodes &&
    current.childNodes[0].classList.contains('spectacle-auto-height-fill'));

export default function useAutofillHeight({
  slideWrapperRef,
  contentRef,
  templateRef,
  slideHeight
}) {
  React.useLayoutEffect(() => {
    if (!contentRef.current.hasChildNodes()) {
      return;
    }
    const childNodes = [].slice.call(contentRef.current.childNodes);
    const metrics = childNodes.reduce(
      (memo, current) => {
        const currentNodeIsAutoFill = isCurrentNodeAutoFill(current);
        const nodeHeight = currentNodeIsAutoFill
          ? 0
          : getNodeFullHeight(current);
        return {
          totalHeight: nodeHeight + memo.totalHeight,
          numberAutoFills: currentNodeIsAutoFill
            ? memo.numberAutoFills + 1
            : memo.numberAutoFills
        };
      },
      { totalHeight: 0, autoFillsHeight: 0, numberAutoFills: 0 }
    );

    if (templateRef.current.hasChildNodes()) {
      const templateChildNodes = [].slice.call(templateRef.current.childNodes);
      metrics.templateHeight = templateChildNodes.reduce(
        (memo, current) => memo + getNodeFullHeight(current),
        0
      );
    } else {
      metrics.templateHeight = 0;
    }

    const slideWrapperStyle = getComputedStyle(slideWrapperRef.current);
    const totalSlideSpace =
      slideHeight -
      (parseFloat(slideWrapperStyle.paddingTop) +
        parseFloat(slideWrapperStyle.paddingBottom));

    const emptySpace =
      totalSlideSpace - (metrics.totalHeight + metrics.templateHeight);

    childNodes.forEach(node => {
      if (!isCurrentNodeAutoFill(node)) {
        return;
      }
      if (
        node.childNodes[0] &&
        node.childNodes[0].tagName.toLowerCase() === 'pre'
      ) {
        node = node.childNodes[0];
      }
      node.style.maxHeight = `${emptySpace / metrics.numberAutoFills}px`;
    });
  }, [slideWrapperRef, contentRef, templateRef, slideHeight]);
}
