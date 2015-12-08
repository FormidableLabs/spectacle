import { PropTypes } from "react";
import tweenState from "react-tween-state";

export default {
  propTypes: {
    transition: PropTypes.array,
    transitionDuration: PropTypes.number
  },
  contextTypes: {
    slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  },
  getDefaultProps() {
    return {
      transition: []
    };
  },
  getInitialState() {
    const { transition } = this.props;
    const state = {
      z: 1
    };

    if (transition.indexOf("fade") !== -1) {
      state.opacity = 1;
    }

    if (transition.indexOf("zoom") !== -1) {
      state.scale = 1;
    }

    if (transition.indexOf("slide") !== -1) {
      state.left = 0;
    }

    if (transition.indexOf("spin") !== -1) {
      state.x = 0;
    }

    return state;
  },
  routerCallback(cb, immediate) {
    const { transition, transitionDuration } = this.props;
    if (transition.length > 0 && immediate !== true) {
      setTimeout(() => {
        return this.isMounted() && cb();
      }, transitionDuration);
    } else {
      return this.isMounted() && cb();
    }
  },
  componentWillEnter(cb) {
    const { slideIndex, lastSlide, transition, transitionDuration } = this.props;
    const direction = slideIndex > lastSlide;

    this.setState({
      z: 1
    }, () => {

      if (transition.indexOf("fade") !== -1) {
        this.tweenState("opacity", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: transitionDuration,
          beginValue: 0,
          endValue: 1
        });
      }

      if (transition.indexOf("zoom") !== -1) {
        this.tweenState("scale", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: transitionDuration,
          beginValue: 0.1,
          endValue: 1
        });
      }

      if (transition.indexOf("slide") !== -1) {
        this.tweenState("left", {
          easing: tweenState.easingTypes.easeOutQuad,
          duration: transitionDuration,
          beginValue: direction ? 100 : -100,
          endValue: 0
        });
      }

      if (transition.indexOf("spin") !== -1) {
        this.tweenState("x", {
          easing: tweenState.easingTypes.easeOutQuad,
          duration: transitionDuration,
          beginValue: direction ? 90 : -90,
          endValue: 0
        });
      }

    });

    this.routerCallback(cb);

  },
  componentWillAppear(cb) {
    const { transition } = this.props;
    const state = {
      z: 1
    };

    if (transition.indexOf("fade") !== -1) {
      state.opacity = 1;
    }

    if (transition.indexOf("zoom") !== -1) {
      state.scale = 1;
    }

    if (transition.indexOf("slide") !== -1) {
      state.left = 0;
    }

    if (transition.indexOf("spin") !== -1) {
      state.x = 0;
    }

    this.setState(state);

    this.routerCallback(cb, true);

  },
  componentWillLeave(cb) {
    const { slideIndex, transition, transitionDuration } = this.props;
    const slide = this.context.store.getState().route.slide || 0;
    const direction = slideIndex > slide;

    this.setState({
      z: ""
    }, () => {

      if (transition.indexOf("fade") !== -1) {
        this.tweenState("opacity", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: transitionDuration,
          endValue: 0
        });
      }

      if (transition.indexOf("zoom") !== -1) {
        this.tweenState("scale", {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: transitionDuration,
          endValue: 0.1
        });
      }

      if (transition.indexOf("slide") !== -1) {
        this.tweenState("left", {
          easing: tweenState.easingTypes.easeOutQuad,
          duration: transitionDuration,
          endValue: direction ? 100 : -100
        });
      }

      if (transition.indexOf("spin") !== -1) {
        this.tweenState("x", {
          easing: tweenState.easingTypes.easeOutQuad,
          duration: transitionDuration,
          endValue: direction ? 90 : -90
        });
      }

    });

    this.routerCallback(cb);

  },
  getTransitionStyles() {
    const { transition } = this.props;
    let transformValue = "";
    let styles = {
      zIndex: this.state.z
    };
    if (transition.indexOf("fade") !== -1) {
      styles = Object.assign(styles, {
        opacity: this.getTweeningValue("opacity")
      });
    }
    if (transition.indexOf("zoom") !== -1) {
      transformValue += ` scale(${this.getTweeningValue("scale")})`;
    }
    if (transition.indexOf("slide") !== -1) {
      transformValue += ` translate3d(${this.getTweeningValue("left")}%, 0, 0)`;
    } else {
      transformValue += " translate3d(0px, 0px, 0px)";
    }
    if (transition.indexOf("spin") !== -1) {
      transformValue += ` rotateY(${this.getTweeningValue("x")}deg)`;
    }
    styles = Object.assign(styles, {
      transform: transformValue
    });
    return styles;
  }
};
