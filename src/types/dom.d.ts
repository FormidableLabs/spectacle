// Augment DOM with vendor-specific props:
interface DocumentOrShadowRoot {
  readonly webkitIsFullScreen: Element | null;
}
