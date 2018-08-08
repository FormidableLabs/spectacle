/* eslint-disable no-invalid-this, max-statements */
import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';

import { VictoryAnimation } from 'victory-core';
import findIndex from 'lodash/findIndex';

class SlideWrapper extends React.PureComponent {
  constructor() {
    super(...arguments);

    this.routerCallback = this.routerCallback.bind(this);
    this.transitionDirection = this.transitionDirection.bind(this);
    this.getTransitionKeys = this.getTransitionKeys.bind(this);
    this.getTransitionStyles = this.getTransitionStyles.bind(this);
    this.getRouteSlideIndex = this.getRouteSlideIndex.bind(this);
  }

  state = {
    reverse: false,
    transitioning: true,
    z: 1
  };

  componentWillEnter(callback) {
    this.setState({ transitioning: false, reverse: false, z: 1 });
    this.routerCallback(callback);
  }

  componentWillAppear(callback) {
    this.setState({ transitioning: false, reverse: false, z: 1 });
    this.routerCallback(callback);
  }

  componentWillLeave(callback) {
    this.setState({ transitioning: true, reverse: true, z: '' });
    this.routerCallback(callback);
  }

  routerCallback(callback) {
    const { transition, transitionDuration } = this.props;
    if (transition.length > 0) {
      setTimeout(() => callback(), transitionDuration);
    } else {
      callback();
    }
  }

  transitionDirection() {
    const { slideIndex, lastSlideIndex } = this.props;
    const routeSlideIndex = this.getRouteSlideIndex();
    return this.state.reverse
      ? slideIndex > routeSlideIndex
      : slideIndex > lastSlideIndex;
  }

  getTransitionKeys() {
    const {
      props: { transition = [], transitionIn = [], transitionOut = [] },
      state: { reverse }
    } = this;
    if (reverse && transitionOut.length > 0) {
      return transitionOut;
    } else if (transitionIn.length > 0) {
      return transitionIn;
    }
    return transition;
  }

  // eslint-disable-next-line
  getTransitionStyles() {
    const { transitioning, z } = this.state;
    const transition = this.getTransitionKeys();
    let styles = { zIndex: z };
    let transformValue = '';

    if (transition.indexOf('fade') !== -1) {
      styles = { ...styles, opacity: transitioning ? 0 : 1 };
    }

    if (transition.indexOf('zoom') !== -1) {
      transformValue += ` scale(${transitioning ? 0.1 : 1.0})`;
    }

    if (transition.indexOf('slide') !== -1) {
      const offset = this.transitionDirection() ? 100 : -100;
      transformValue += ` translate3d(${transitioning ? offset : 0}%, 0, 0)`;
    } else {
      transformValue += ' translate3d(0px, 0px, 0px)';
    }

    if (transition.indexOf('spin') !== -1) {
      const angle = this.transitionDirection() ? 90 : -90;
      transformValue += ` rotateY(${transitioning ? angle : 0}deg)`;
    }

    const functionStyles = transition.reduce((memo, current) => {
      if (isFunction(current)) {
        return {
          ...memo,
          ...current(transitioning, this.transitionDirection())
        };
      }
      return memo;
    }, {});

    return { ...styles, transform: transformValue, ...functionStyles };
  }

  getRouteSlideIndex() {
    const { slideReference } = this.props;
    const { route } = this.context.store.getState();
    const { slide } = route;
    const slideIndex = findIndex(slideReference, reference => {
      return slide === String(reference.id);
    });
    return Math.max(0, slideIndex);
  }

  render() {
    const { children, transitionDuration } = this.props;

    if (!this.props.viewerScaleMode) {
      document.documentElement.style.fontSize = `${16 * this.state.zoom}px`;
    }

    return (
      <VictoryAnimation
        data={this.getTransitionStyles()}
        duration={transitionDuration}
        easing="quadInOut"
      >
        {animatedStyles => (
          <div
            style={{
              ...animatedStyles,
              transformOrigin: 'center center',
              position: this.props.export ? 'relative' : 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              overflow: 'hidden',
              backgroundColor: this.context.styles.global.body.background || ''
            }}
          >
            {children}
          </div>
        )}
      </VictoryAnimation>
    );
  }
}

SlideWrapper.defaultProps = {
  align: 'center center',
  presenterStyle: {},
  style: {},
  viewerScaleMode: false
};

SlideWrapper.propTypes = {
  align: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  dispatch: PropTypes.func,
  export: PropTypes.bool,
  getAnimStep: PropTypes.func,
  getAppearStep: PropTypes.func,
  hash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lastSlideIndex: PropTypes.number,
  margin: PropTypes.number,
  notes: PropTypes.any,
  onActive: PropTypes.func,
  presenterStyle: PropTypes.object,
  print: PropTypes.bool,
  slideIndex: PropTypes.number,
  slideReference: PropTypes.array,
  style: PropTypes.object,
  transition: PropTypes.array,
  transitionDuration: PropTypes.number,
  transitionIn: PropTypes.array,
  transitionOut: PropTypes.array,
  viewerScaleMode: PropTypes.bool
};

SlideWrapper.contextTypes = {
  styles: PropTypes.object,
  contentWidth: PropTypes.number,
  contentHeight: PropTypes.number,
  export: PropTypes.bool,
  print: PropTypes.object,
  overview: PropTypes.bool,
  store: PropTypes.object
};

export default SlideWrapper;
