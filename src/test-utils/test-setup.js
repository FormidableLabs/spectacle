/**
 * JSDom does not provide this method, but it's needed for various components
 * to mount appropriately.
 * Here, we're mocking this method with some static values.
 */
window.HTMLElement.prototype.getClientRects = () => [
  {
    width: 500,
    height: 300
  }
];
