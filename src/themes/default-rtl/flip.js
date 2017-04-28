const flip = (styleObj, colorArgs, fontArgs) => {

  const defaultStyles = styleObj(colorArgs, fontArgs);
  defaultStyles.progress.bar.bar.float = "right";
  defaultStyles.progress.number.container.left = defaultStyles.progress.number.container.right;
  delete defaultStyles.progress.number.container.right;
  defaultStyles.components.content.direction = "rtl";
  defaultStyles.components.blockquote.textAlign = "right";
  defaultStyles.components.quote.borderRight = defaultStyles.components.quote.borderLeft;
  delete defaultStyles.components.quote.borderLeft;
  defaultStyles.components.quote.paddingRight = defaultStyles.components.quote.paddingLeft;
  delete defaultStyles.components.quote.paddingLeft;
  defaultStyles.components.list.textAlign = "right";
  return Object.assign({}, defaultStyles, {
    controls: {
      prev: defaultStyles.controls.next,
      prevIcon: defaultStyles.controls.nextIcon,
      next: defaultStyles.controls.prev,
      nextIcon: defaultStyles.controls.prevIcon
    }
  });
};

export default flip;
