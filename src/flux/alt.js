/**
 * Alt instance.
 */
import Alt from "alt";

import SlideActions from "./slide-actions";
import SlideStore from "./slide-store";

export default class Flux extends Alt {
  constructor(config = {}) {
    super(config);

    this.addActions("SlideActions", SlideActions);
    this.addStore("SlideStore", SlideStore);
  }
}
