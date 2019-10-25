import * as React from 'react';

const getNodeFullHeight = node => {
  const style = getComputedStyle(node);
  let nextSiblingMarginTop = 0;
  if (node.nextSibling) {
    nextSiblingMarginTop = parseFloat(
      getComputedStyle(node.nextSibling).marginTop
    );
  }
  return (
    node.offsetHeight +
    parseFloat(style.marginTop) -
    nextSiblingMarginTop +
    parseFloat(style.marginBottom)
  );
};

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
        const currentNodeIsAutoFill = current.classList.contains(
          'spectacle-auto-height-fill'
        );
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
      metrics.templateHeight = templateChildNodes.reduce((memo, current) => {
        const nodeHeight = getNodeFullHeight(current);
        return memo + nodeHeight;
      }, 0);
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
      const currentNodeIsAutoFill = node.classList.contains(
        'spectacle-auto-height-fill'
      );
      if (!currentNodeIsAutoFill) {
        return;
      }
      node.style.maxHeight = `${emptySpace / metrics.numberAutoFills}px`;
    });
  }, [slideWrapperRef, contentRef, templateRef, slideHeight]);
}
