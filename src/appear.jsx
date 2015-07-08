import React from "react/addons";
import tweenState from "react-tween-state";
import _ from "lodash";

const Appear = React.createClass({
  mixins: [tweenState.Mixin],
  propTypes: {
    children: React.PropTypes.node
  },
  contextTypes: {
    flux: React.PropTypes.object,
    router: React.PropTypes.object,
    slide: React.PropTypes.number
  },
  getInitialState() {
    return {
      active: false,
      opacity: 0
    };
  },
  componentDidMount() {
    this.context.flux.stores.SlideStore.listen(this._storeChange);
    const slide = "slide" in this.context.router.state.params ?
      this.context.router.state.params.slide : 0;
    this.context.flux.actions.SlideActions.addFragment({
      slide,
      id: this._reactInternalInstance._rootNodeID,
      visible: false
    });
  },
  componentWillUnmount() {
    this.context.flux.stores.SlideStore.unlisten(this._storeChange);
  },
  _storeChange(state) {
    const slide = "slide" in this.context.router.state.params ?
      this.context.router.state.params.slide : 0;
    const key = _.findKey(state.fragments[slide], {
      "id": this._reactInternalInstance._rootNodeID
    });
    if (state.fragments[slide].hasOwnProperty(key)) {
      this.setState({
        active: state.fragments[slide][key].visible
      }, () => {
        let endVal = this.state.active ? 1 : 0;
        if (this.context.router.state.location.query &&
            "export" in this.context.router.state.location.query) {
          endVal = 1;
        }
        this.tweenState("opacity", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 300,
          endValue: endVal
        });
      });
    }
  },
  render() {
    const styles = {
      opacity: this.getTweeningValue("opacity")
    };
    return (
      <div style={styles} className="appear">
        {this.props.children}
      </div>
    );
  }
});

export default Appear;
