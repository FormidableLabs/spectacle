/*eslint new-cap:0, max-statements:0*/
import React, { cloneElement } from 'react';
import { VictoryAnimation } from 'victory-core';
import findIndex from 'lodash/findIndex';

/**
 * Decorator for adding Spectacle transition support
 * to components' ReactCSSTransitionGroup lifecycle functions.
 * @param {class} target The class to be decorated as Transitionable
 * @returns {object} The transition animation lifecyle functions
 */
const Transitionable = function (target) {
  const transitionable = {
    componentWillEnter(callback) {
      this.setState({ transitioning: false, reverse: false, z: 1 });
      this.routerCallback(callback);
    },

    componentWillAppear(callback) {
      this.setState({ transitioning: false, reverse: false, z: 1 });
      this.routerCallback(callback);
    },

    componentWillLeave(callback) {
      this.setState({ transitioning: true, reverse: true, z: '' });
      this.routerCallback(callback);
    },

    routerCallback(callback) {
      const { transition, transitionDuration } = this.props;
      if (transition.length > 0) {
        setTimeout(() => callback(), transitionDuration);
      } else {
        callback();
      }
    },

    transitionDirection() {
      const { slideIndex, lastSlideIndex } = this.props;
      const routeSlideIndex = this._getRouteSlideIndex();
      return this.state.reverse ? slideIndex > routeSlideIndex : slideIndex > lastSlideIndex;
    },

    getTransitionStyles() {
      const { transition = [] } = this.props;
      const { transitioning, z } = this.state;

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

      return { ...styles, transform: transformValue };
    },

    _getRouteSlideIndex() {
      const { slideReference } = this.props;
      const slide = this.context.store.getState().route.slide;
      const slideIndex = findIndex(slideReference, reference => {
         return slide === String(reference.id);
      });
      return Math.max(0, slideIndex);
    },
  };

  Object.assign(target.prototype, transitionable);
};

/**
 * Decorator for rendering the transition. Wraps the `render` function
 * output of a component with a `VictoryAnimation` component that performs
 * the transition animation.
 * @param {class} target The class of the decorated function
 * @param {string} name The name of the decorated function
 * @param {object} descriptor The descriptor of the decorated function
 * @returns {object} descriptor A modified descriptor of the wrapped
 * transitionable render function
 */
const renderTransition = function (target, name, descriptor) {
  const originalFunc = descriptor.value;

  descriptor.value = function wrap(...args) {
    const content = originalFunc.call(this, ...args);
    const { transitionDuration } = this.props;
    return (
      <VictoryAnimation
        data={this.getTransitionStyles()}
        duration={transitionDuration}
        easing="quadInOut"
      >
        {(animatableStyles) => (
          cloneElement(content, {
            style: [ ...content.props.style, animatableStyles ]
          })
        )}
      </VictoryAnimation>
    );
  };

  return descriptor;
};

export { Transitionable, renderTransition };
