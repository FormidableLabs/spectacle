import React from 'react/addons';
import assign from 'object-assign';
import Base from './base';

class BaseWithTransition extends Base {
  constructor(props) {
    super(props);

    let direction = this.props.slideIndex > this.props.lastSlide;
    let state = {};

    if (this.props.transition.indexOf('fade') !== -1) {
      state.opacity = 0;
    }

    if (this.props.transition.indexOf('zoom') !== -1) {
      state.scale = 0;
    }

    if (this.props.transition.indexOf('slide') !== -1) {
      state.left = direction ? 100 : -100;
    }

    if (this.props.transition.indexOf('spin') !== -1) {
      state.x = direction ? 90 : -90;
    }

    this.state = state;

    this.routerCallback = this.routerCallback.bind(this);
    this.componentWillAppear = this.componentWillAppear.bind(this);
    this.componentWillLeave = this.componentWillLeave.bind(this);
    this.getTransitionStyles = this.getTransitionStyles.bind(this);
  }

  routerCallback(cb, immediate) {
    if (this.props.transition.length > 0 && !immediate) {
      setTimeout(cb, this.props.transitionDuration);
    } else {
      cb();
    }
  }

  componentWillEnter(cb) {
    let state = {};

    if (this.props.transition.indexOf('fade') !== -1) {
      state.opacity = 1;
    }

    if (this.props.transition.indexOf('zoom') !== -1) {
      state.scale = 1;
    }

    if (this.props.transition.indexOf('slide') !== -1) {
      state.left = 0;
    }

    if (this.props.transition.indexOf('spin') !== -1) {
      state.x = 0;
    }

    this.setState(state);

    this.routerCallback(cb);

  }

  componentWillAppear(cb) {
    let state = {};

    if (this.props.transition.indexOf('fade') !== -1) {
      state.opacity = 1;
    }

    if (this.props.transition.indexOf('zoom') !== -1) {
      state.scale = 1;
    }

    if (this.props.transition.indexOf('slide') !== -1) {
      state.left = 0;
    }

    if (this.props.transition.indexOf('spin') !== -1) {
      state.x = 0;
    }

    this.setState(state);

    this.routerCallback(cb, true);

  }

  componentWillLeave(cb) {
    let slide = parseInt(this.context.router.state.params.slide) || 0;
    let direction = this.props.slideIndex > slide;

    let state = {};

    if (this.props.transition.indexOf('fade') !== -1) {
      state.opacity = 0;
    }

    if (this.props.transition.indexOf('zoom') !== -1) {
      state.scale = 0;
    }

    if (this.props.transition.indexOf('slide') !== -1) {
      state.left = direction ? 100 : -100;
    }

    if (this.props.transition.indexOf('spin') !== -1) {
      state.x = direction ? 90 : -90;
    }

    this.setState(state);

    this.routerCallback(cb);

  }

  getTransitionStyles() {
    let transformValue = '';
    let styles = {zIndex: this.props.slideIndex + 1};
    if (this.props.transition.indexOf('fade') !== -1) {
      styles = assign(styles, {
        opacity: this.state.opacity
      });
    }

    if (this.props.transition.indexOf('zoom') !== -1) {
      transformValue += ' scale(' + this.state.scale + ')';
    }

    if (this.props.transition.indexOf('slide') !== -1) {
      transformValue += ' translate3d(' + this.state.left + '%, 0, 0)';
    }

    if (this.props.transition.indexOf('spin') !== -1) {
      transformValue += ' rotateY(' + this.state.x + 'deg)';
    }

    const transitionDuration = this.props.transitionDuration || 300;
    const transitionDelay = this.props.transitionDelay || 0;
    const transitionEasing = this.props.transitionEasing || 'cubic-bezier(0.455, 0.030, 0.515, 0.955)';
    styles = assign(styles, {
      transform: transformValue,
      transition: 'all ' + transitionDuration + 'ms ' + transitionEasing + ' ' + transitionDelay + 'ms'
    });
    return styles;
  }
}

BaseWithTransition.propTypes = assign({}, Base.propTypes || {}, {
  transition: React.PropTypes.array,
  transitionDuration: React.PropTypes.number,
  transitionDelay: React.PropTypes.number,
  transitionEasing: React.PropTypes.string
});

BaseWithTransition.defaultProps = assign({}, Base.defaultProps || {}, {
  transition: []
});

BaseWithTransition.contextTypes = assign({}, Base.contextTypes || {}, {
  router: React.PropTypes.object
});

export default BaseWithTransition;
