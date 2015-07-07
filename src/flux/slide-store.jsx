export default class SlideStore {
  constructor() {
    this.bindActions(this.alt.getActions("SlideActions"));
    this.fragments = {};
  }

  onAddFragment(payload) {
    const fragments = this.fragments;
    const fid = "f" + payload.id;
    if (!fragments.hasOwnProperty(payload.slide)) {
      fragments[payload.slide] = {};
      fragments[payload.slide][fid] = payload;
    } else {
      const slide = fragments[payload.slide];
      if (!slide.hasOwnProperty(fid)) {
        slide[fid] = payload;
      }
    }
    this.setState({
      fragments
    });
  }
  onUpdateFragment(payload) {
    const fragments = this.fragments;
    fragments[payload.fragment.slide]["f" + payload.fragment.id].visible = payload.visible;
    this.setState({
      fragments
    });
  }
}
