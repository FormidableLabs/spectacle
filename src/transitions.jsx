import React from 'react/addons';
import assign from 'object-assign';
import tweenState from 'react-tween-state';

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
    }
  },
  getInitialState() {
    let state = {
      z: 100
    };

    if(this.props.transition.indexOf('fade') !== -1) {
      state = assign(state, {
        opacity: 0
      });
    }

    if(this.props.transition.indexOf('zoom') !== -1) {
      state = assign(state, {
        scale: 0
      });
    }

    if(this.props.transition.indexOf('slide') !== -1) {
      state = assign(state, {
        left: 0
      });
    }

    return state;
  },
  routerCallback(cb, immediate) {
    if (this.props.transition.length > 0 && immediate !== true) {
      setTimeout(cb,this.props.transitionDuration)
    } else {
      cb();
    }
  },
  componentWillEnter(cb) {
    let slide = parseInt(this.context.router.state.params.slide) || 0;
    let direction = this.props.slideIndex > this.props.lastSlide;

    if(this.props.transition.indexOf('fade') !== -1) {
      this.tweenState('opacity', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: this.props.transitionDuration,
        endValue: 1
      });
    }

    if(this.props.transition.indexOf('zoom') !== -1) {
      this.tweenState('scale', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: this.props.transitionDuration,
        endValue: 1
      });
    }

    if(this.props.transition.indexOf('slide') !== -1) {
      this.tweenState('left', {
        easing: tweenState.easingTypes.easeOutQuad,
        duration: this.props.transitionDuration,
        beginValue: direction ? 100 : -100,
        endValue: 0
      });
    }

    this.setState({
      z: 200
    });

    this.routerCallback(cb);

  },
  componentWillAppear(cb) {

    if(this.props.transition.indexOf('fade') !== -1) {
      this.setState({
        opacity: 1
      });
    }

    if(this.props.transition.indexOf('zoom') !== -1) {
      this.setState({
        scale: 1
      });
    }

    if(this.props.transition.indexOf('slide') !== -1) {
      this.setState({
        left: 0
      });
    }

    this.routerCallback(cb, true);

  },
  componentWillLeave(cb) {

    let slide = parseInt(this.context.router.state.params.slide) || 0;
    let direction = this.props.slideIndex > slide;

    if(this.props.transition.indexOf('fade') !== -1) {
      this.tweenState('opacity', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: this.props.transitionDuration,
        endValue: 0
      });
    }

    if(this.props.transition.indexOf('zoom') !== -1) {
      this.tweenState('scale', {
        easing: tweenState.easingTypes.easeInOutQuad,
        duration: this.props.transitionDuration,
        endValue: 0
      });
    }

    if(this.props.transition.indexOf('slide') !== -1) {
      this.tweenState('left', {
        easing: tweenState.easingTypes.easeOutQuad,
        duration: this.props.transitionDuration,
        endValue: direction ? 100 : -100
      });
    }

    this.setState({
      z: 100
    });

    this.routerCallback(cb);
  },
  getTransitionStyles() {
    let styles = {
      zIndex: this.state.z || 100
    };
    if(this.props.transition.indexOf('fade') !== -1) {
      styles = assign(styles, {
        opacity: this.getTweeningValue('opacity')
      });
    }
    if(this.props.transition.indexOf('zoom') !== -1) {
      styles = assign(styles, {
        transform: 'scale(' + this.getTweeningValue('scale') + ')'
      });
    }
    if(this.props.transition.indexOf('slide') !== -1) {
      styles = assign(styles, {
        left: this.getTweeningValue('left') + "%"
      });
    }
    return styles;
  }
}