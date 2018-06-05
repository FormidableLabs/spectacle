/* eslint-disable no-invalid-this, max-statements */
import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import { getStyles } from '../utils/base';
import { addFragment } from '../actions';
import stepCounter from '../utils/step-counter';
import {
  SlideContainer,
  SlideContent,
  SlideContentWrapper
} from './slide-components';
import { VictoryAnimation } from 'victory-core';
import findIndex from 'lodash/findIndex';

class Slide extends React.PureComponent {
  constructor() {
    super(...arguments);

    this.routerCallback = this.routerCallback.bind(this);
    this.setZoom = this.setZoom.bind(this);
    this.transitionDirection = this.transitionDirection.bind(this);
    this.getTransitionKeys = this.getTransitionKeys.bind(this);
    this.getTransitionStyles = this.getTransitionStyles.bind(this);
    this.getRouteSlideIndex = this.getRouteSlideIndex.bind(this);

    this.stepCounter = stepCounter();
  }

  state = {
    contentScale: 1,
    reverse: false,
    transitioning: true,
    z: 1,
    zoom: 1
  };

  getChildContext() {
    return {
      stepCounter: {
        setFragments: this.stepCounter.setFragments
      },
      slideHash: this.props.hash
    };
  }

  componentDidMount() {
    this.setZoom();
    const slide = this.slideRef;
    const frags = slide.querySelectorAll('.fragment');
    let currentOrder = 0;
    if (frags && frags.length && !this.context.overview) {
      Array.prototype.slice
        .call(frags, 0)
        .sort(
          (lhs, rhs) =>
            parseInt(lhs.dataset.order, 10) - parseInt(rhs.dataset.order, 10)
        )
        .forEach(frag => {
          frag.dataset.fid = currentOrder;
          if (this.props.dispatch) {
            this.props.dispatch(
              addFragment({
                className: frag.className || '',
                slide: this.props.hash,
                id: `${this.props.slideIndex}-${currentOrder}`,
                animations: Array.from({ length: frag.dataset.animCount }).fill(
                  this.props.lastSlideIndex > this.props.slideIndex
                )
              })
            );
          }
          currentOrder += 1;
        });
    }
    window.addEventListener('load', this.setZoom);
    window.addEventListener('resize', this.setZoom);

    if (isFunction(this.props.onActive)) {
      this.props.onActive(this.props.slideIndex);
    }

    if (this.props.getAppearStep) {
      /* eslint-disable no-console */
      console.warn(
        'getAppearStep has been deprecated, use getAnimStep instead'
      );
      /* eslint-enable */
    }
  }

  componentDidUpdate() {
    const { steps, slideIndex } = this.stepCounter.getSteps();
    const stepFunc = this.props.getAnimStep || this.props.getAppearStep;
    if (stepFunc) {
      if (slideIndex === this.props.slideIndex) {
        stepFunc(steps);
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('load', this.setZoom);
    window.removeEventListener('resize', this.setZoom);
  }

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

  setZoom() {
    const mobile = window.matchMedia('(max-width: 628px)').matches;
    const content = this.contentRef;
    if (content) {
      const zoom = this.props.viewerScaleMode
        ? 1
        : content.offsetWidth / this.context.contentWidth;

      const contentScaleY =
        content.parentNode.offsetHeight / this.context.contentHeight;
      const contentScaleX = this.props.viewerScaleMode
        ? content.parentNode.offsetWidth / this.context.contentWidth
        : content.parentNode.offsetWidth / this.context.contentHeight;
      const minScale = Math.min(contentScaleY, contentScaleX);

      let contentScale = minScale < 1 ? minScale : 1;
      if (mobile && this.props.viewerScaleMode !== true) {
        contentScale = 1;
      }
      this.setState({
        zoom: zoom > 0.6 ? zoom : 0.6,
        contentScale
      });
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
    const { presenterStyle, children, transitionDuration } = this.props;

    if (!this.props.viewerScaleMode) {
      document.documentElement.style.fontSize = `${16 * this.state.zoom}px`;
    }

    const contentClass = isUndefined(this.props.className)
      ? ''
      : this.props.className;

    return (
      <VictoryAnimation
        data={this.getTransitionStyles()}
        duration={transitionDuration}
        easing="quadInOut"
      >
        {animatedStyles => (
          <SlideContainer
            className="spectacle-slide"
            innerRef={s => {
              this.slideRef = s;
            }}
            exportMode={this.props.export}
            printMode={this.props.print}
            background={this.context.styles.global.body.background}
            styles={{
              base: getStyles.call(this),
              presenter: presenterStyle
            }}
            style={{ ...animatedStyles }}
          >
            <SlideContentWrapper
              align={this.props.align}
              overviewMode={this.context.overview}
            >
              <SlideContent
                innerRef={c => {
                  this.contentRef = c;
                }}
                className={`${contentClass} spectacle-content`}
                overviewMode={this.context.overview}
                width={this.context.contentWidth}
                height={this.context.contentHeight}
                scale={this.state.contentScale}
                zoom={this.state.zoom}
                margin={this.props.margin}
                styles={{ context: this.context.styles.components.content }}
              >
                {children}
              </SlideContent>
            </SlideContentWrapper>
          </SlideContainer>
        )}
      </VictoryAnimation>
    );
  }
}

Slide.defaultProps = {
  align: 'center center',
  presenterStyle: {},
  style: {},
  viewerScaleMode: false
};

Slide.propTypes = {
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

Slide.contextTypes = {
  styles: PropTypes.object,
  contentWidth: PropTypes.number,
  contentHeight: PropTypes.number,
  export: PropTypes.bool,
  print: PropTypes.object,
  overview: PropTypes.bool,
  store: PropTypes.object
};

Slide.childContextTypes = {
  slideHash: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stepCounter: PropTypes.shape({
    setFragments: PropTypes.func
  })
};

export default Slide;
