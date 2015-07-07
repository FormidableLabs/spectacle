/*global setTimeout*/

import React from "react/addons";
import assign from "object-assign";
import tweenState from "react-tween-state";

export default {
  propTypes: {
    transition: React.PropTypes.array,
    transitionDuration: React.PropTypes.number
  },
  contextTypes: {
    router: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      transition: []
    };
  },
  getInitialState() {
    const state = {
      z: 1
    };

    if (this.props.transition.indexOf("fade") !== -1) {
      state.opacity = 1;
    }

    if (this.props.transition.indexOf("zoom") !== -1) {
      state.scale = 1;
    }

    if (this.props.transition.indexOf("slide") !== -1) {
      state.left = 0;
    }

    if (this.props.transition.indexOf("spin") !== -1) {
      state.x = 0;
    }

    return state;
  },
  routerCallback(cb, immediate) {
    if (this.props.transition.length > 0 && immediate !== true) {
      setTimeout(cb, this.props.transitionDuration);
    } else {
      cb();
    }
  },
  componentWillEnter(cb) {
    const direction = this.props.slideIndex > this.props.lastSlide;

    this.setState({
      z: 1
    }, ()=> {

      if (this.props.transition.indexOf("fade") !== -1) {
        this.tweenState("opacity", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: this.props.transitionDuration,
          beginValue: 0,
          endValue: 1
        });
      }

      if (this.props.transition.indexOf("zoom") !== -1) {
        this.tweenState("scale", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: this.props.transitionDuration,
          beginValue: 0.1,
          endValue: 1
        });
      }

      if (this.props.transition.indexOf("slide") !== -1) {
        this.tweenState("left", {
          easing: tweenState.easingTypes.easeOutQuad,
          duration: this.props.transitionDuration,
          beginValue: direction ? 100 : -100,
          endValue: 0
        });
      }

      if (this.props.transition.indexOf("spin") !== -1) {
        this.tweenState("x", {
          easing: tweenState.easingTypes.easeOutQuad,
          duration: this.props.transitionDuration,
          beginValue: direction ? 90 : -90,
          endValue: 0
        });
      }

    });

    this.routerCallback(cb);

  },
  componentWillAppear(cb) {
    const state = {
      z: 1
    };

    if (this.props.transition.indexOf("fade") !== -1) {
      state.opacity = 1;
    }

    if (this.props.transition.indexOf("zoom") !== -1) {
      state.scale = 1;
    }

    if (this.props.transition.indexOf("slide") !== -1) {
      state.left = 0;
    }

    if (this.props.transition.indexOf("spin") !== -1) {
      state.x = 0;
    }

    this.setState(state);

    this.routerCallback(cb, true);

  },
  componentWillLeave(cb) {
    const slide = parseInt(this.context.router.state.params.slide) || 0;
    const direction = this.props.slideIndex > slide;

    this.setState({
      z: ""
    }, () => {

      if (this.props.transition.indexOf("fade") !== -1) {
        this.tweenState("opacity", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: this.props.transitionDuration,
          endValue: 0
        });
      }

      if (this.props.transition.indexOf("zoom") !== -1) {
        this.tweenState("scale", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: this.props.transitionDuration,
          endValue: 0.1
        });
      }

      if (this.props.transition.indexOf("slide") !== -1) {
        this.tweenState("left", {
          easing: tweenState.easingTypes.easeOutQuad,
          duration: this.props.transitionDuration,
          endValue: direction ? 100 : -100
        });
      }

      if (this.props.transition.indexOf("spin") !== -1) {
        this.tweenState("x", {
          easing: tweenState.easingTypes.easeOutQuad,
          duration: this.props.transitionDuration,
          endValue: direction ? 90 : -90
        });
      }

    });

    this.routerCallback(cb);

  },
  getTransitionStyles() {
    let transformValue = "";
    let styles = {
      zIndex: this.state.z
    };
    if (this.props.transition.indexOf("fade") !== -1) {
      styles = assign(styles, {
        opacity: this.getTweeningValue("opacity")
      });
    }
    if (this.props.transition.indexOf("zoom") !== -1) {
      transformValue += " scale(" + this.getTweeningValue("scale") + ")";
    }
    if (this.props.transition.indexOf("slide") !== -1) {
      transformValue += " translate3d(" + this.getTweeningValue("left") + "%, 0, 0)";
    } else {
      transformValue += " translate3d(0px, 0px, 0px)";
    }
    if (this.props.transition.indexOf("spin") !== -1) {
      transformValue += " rotateY(" + this.getTweeningValue("x") + "deg)";
    }
    styles = assign(styles, {
      transform: transformValue
    });
    return styles;
  }
};
