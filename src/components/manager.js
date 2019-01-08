/*eslint new-cap:0, max-statements:0, no-console:0*/
/* eslint react/no-did-mount-set-state: 0 */

import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';
import filter from 'lodash/filter';
import size from 'lodash/size';
import findIndex from 'lodash/findIndex';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { setGlobalStyle, updateFragment } from '../actions';
import Typeface from './typeface';
import { getSlideByIndex } from '../utils/slides';
import styled from 'react-emotion';
import { string as toStringStyle } from 'to-style';
import memoize from 'lodash/memoize';

import Presenter from './presenter';
import Export from './export';
import SlideWrapper from './slide-wrapper';
import Overview from './overview';
import Magic from './magic';

import AutoplayControls from './autoplay-controls';
import Fullscreen from './fullscreen';
import Progress from './progress';
import Controls from './controls';
import { toggleFullscreen } from '../utils/fullscreen';

let convertStyle = styles => {
  return Object.keys(styles)
    .map(key => {
      return `${key} { ${toStringStyle(styles[key])}} `;
    })
    .join('');
};

convertStyle = memoize(convertStyle);

const StyledDeck = styled.div(props => ({
  backgroundColor:
    props.route.params.indexOf('presenter') !== -1 ||
    props.route.params.indexOf('overview') !== -1
      ? 'black'
      : '',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
}));

const StyledTransition = styled(ReactTransitionGroup)({
  height: '100%',
  width: '100%',
  perspective: 1000,
  transformStyle: 'flat'
});

function buildSlideReference(props) {
  const slideReference = [];
  Children.toArray(props.children).forEach((child, rootIndex) => {
    if (child.type === Magic) {
      Children.toArray(child.props.children).forEach((setSlide, magicIndex) => {
        const reference = {
          id: setSlide.props.id || slideReference.length,
          magicIndex,
          rootIndex
        };
        slideReference.push(reference);
      });
    } else if (!child.props.hasSlideChildren) {
      const reference = {
        id: child.props.id || slideReference.length,
        rootIndex
      };
      if (child.props.goTo) {
        reference.goTo = child.props.goTo;
      }
      slideReference.push(reference);
    } else {
      child.props.children.forEach((setSlide, setIndex) => {
        const reference = {
          id: setSlide.props.id || slideReference.length,
          setIndex,
          rootIndex
        };
        if (child.props.goTo) {
          reference.goTo = child.props.goTo;
        }
        slideReference.push(reference);
      });
    }
  });
  return slideReference;
}

export class Manager extends Component {
  static displayName = 'Manager';

  static propTypes = {
    autoplay: PropTypes.bool,
    autoplayDuration: PropTypes.number,
    autoplayLoop: PropTypes.bool,
    autoplayOnStart: PropTypes.bool,
    children: PropTypes.node,
    contentHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    controls: PropTypes.bool,
    disableKeyboardControls: PropTypes.bool,
    dispatch: PropTypes.func,
    fragment: PropTypes.object,
    globalStyles: PropTypes.bool,
    progress: PropTypes.oneOf(['pacman', 'bar', 'number', 'none']),
    route: PropTypes.object,
    showFullscreenControl: PropTypes.bool,
    transition: PropTypes.array,
    transitionDuration: PropTypes.number
  };

  static contextTypes = {
    styles: PropTypes.object,
    print: PropTypes.object,
    history: PropTypes.object,
    presenter: PropTypes.bool,
    export: PropTypes.bool,
    overview: PropTypes.bool,
    store: PropTypes.object,
    slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  static childContextTypes = {
    contentWidth: PropTypes.number,
    contentHeight: PropTypes.number,
    goToSlide: PropTypes.func
  };

  static defaultProps = {
    autoplay: false,
    autoplayDuration: 7000,
    autoplayLoop: true,
    autoplayOnStart: true,
    contentWidth: 1000,
    contentHeight: 700,
    disableKeyboardControls: false,
    transition: [],
    transitionDuration: 500,
    progress: 'pacman',
    controls: true,
    globalStyles: true
  };

  constructor(props) {
    super(...arguments);
    this._getProgressStyles = this._getProgressStyles.bind(this);
    this._getControlStyles = this._getControlStyles.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleScreenChange = this._handleScreenChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this._goToSlide = this._goToSlide.bind(this);
    this._startAutoplay = this._startAutoplay.bind(this);
    this._stopAutoplay = this._stopAutoplay.bind(this);
    this._resetViewedIndexes = this._resetViewedIndexes.bind(this);
    this.presentationConnection = null;

    this.state = {
      lastSlideIndex: null,
      slideReference: [],
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < props.contentWidth,
      autoplaying: props.autoplay ? props.autoplayOnStart : false
    };

    this.viewedIndexes = new Set();
    this.slideCache = null;
  }

  getChildContext() {
    return {
      contentWidth: this.props.contentWidth,
      contentHeight: this.props.contentHeight,
      goToSlide: slide => this._goToSlide({ slide })
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return { slideReference: buildSlideReference(nextProps) };
  }

  componentDidMount() {
    const slideIndex = this._getSlideIndex();
    const autoplayOnStart = this.props.autoplay
      ? this.props.autoplayOnStart
      : false;
    this.setState({
      lastSlideIndex: slideIndex
    });
    this._attachEvents();
    if (autoplayOnStart) {
      this._startAutoplay();
    }
  }

  componentDidUpdate() {
    if (
      this.props.globalStyles &&
      !this.context.store.getState().style.globalStyleSet
    ) {
      this.props.dispatch(setGlobalStyle());
    }
  }

  componentWillUnmount() {
    this._detachEvents();
  }

  _attachEvents() {
    window.addEventListener('storage', this._goToSlide);
    window.addEventListener('keydown', this._handleKeyPress);
    window.addEventListener('resize', this._handleScreenChange);
    if (
      (((navigator || {}).presentation || {}).receiver || {}).connectionList
    ) {
      navigator.presentation.receiver.connectionList.then(list => {
        list.connections.map(connection => {
          this.presentationConnection = connection;
          connection.addEventListener('message', event => {
            this._goToSlide({ key: 'spectacle-slide', newValue: event.data });
          });
        });
        list.addEventListener('connectionavailable', e => {
          this.presentationConnection = e.connection;
          e.connection.addEventListener('message', event => {
            this._goToSlide({ key: 'spectacle-slide', newValue: event.data });
          });
        });
      });
    }
  }
  _detachEvents() {
    window.removeEventListener('storage', this._goToSlide);
    window.removeEventListener('keydown', this._handleKeyPress);
    window.removeEventListener('resize', this._handleScreenChange);
  }
  _startAutoplay() {
    clearInterval(this.autoplayInterval);
    this.setState({ autoplaying: true });
    this.autoplayInterval = setInterval(() => {
      this._nextSlide();
    }, this.props.autoplayDuration);
  }
  _stopAutoplay() {
    this.setState({ autoplaying: false });
    clearInterval(this.autoplayInterval);
  }
  _toggleAutoplaying() {
    if (this.state.autoplaying) {
      this._stopAutoplay();
    } else {
      this._startAutoplay();
    }
  }
  _handleEvent(e) {
    // eslint-disable-line complexity
    const event = window.event ? window.event : e;

    if (
      event.keyCode === 37 || // 'ArrowLeft'|
      event.keyCode === 33 || // 'PageUp'
      (event.keyCode === 32 && // 'Space'
        event.shiftKey)
    ) {
      this._prevSlide();
      this._stopAutoplay();
    } else if (
      event.keyCode === 39 || // 'ArrowRight'
      event.keyCode === 34 || // 'PageDown'
      (event.keyCode === 32 && // 'Space'
        !event.shiftKey)
    ) {
      this._nextSlide();
      this._stopAutoplay();
    } else if (
      event.altKey &&
      event.keyCode === 79 && // 'o'
      !event.ctrlKey &&
      !event.metaKey
    ) {
      this._toggleOverviewMode();
    } else if (
      event.altKey &&
      event.keyCode === 80 && // 'p'
      !event.ctrlKey &&
      !event.metaKey
    ) {
      this._togglePresenterMode();
    } else if (
      event.altKey &&
      event.keyCode === 84 && // 't'
      !event.ctrlKey &&
      !event.metaKey
    ) {
      this._toggleTimerMode();
    } else if (
      event.altKey &&
      event.keyCode === 65 && // 'a'
      !event.ctrlKey &&
      !event.metaKey &&
      this.props.autoplay
    ) {
      this._toggleAutoplaying();
    } else if (
      event.altKey &&
      event.keyCode === 70 && // 'f'
      !event.ctrlKey &&
      !event.metaKey
    ) {
      toggleFullscreen();
    }
  }
  _handleKeyPress(e) {
    const event = window.event ? window.event : e;

    if (
      event.target instanceof HTMLInputElement ||
      event.target.type === 'textarea' ||
      event.target.contentEditable === 'true' ||
      this.props.disableKeyboardControls
    ) {
      return;
    }

    this._handleEvent(e);
  }
  _handleScreenChange() {
    this.setState({
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < this.props.contentWidth
    });
  }
  _toggleOverviewMode() {
    const suffix =
      this.props.route.params.indexOf('overview') !== -1 ? '' : '?overview';
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }
  _togglePresenterMode() {
    const presenting = this.props.route.params.indexOf('presenter') !== -1;
    const suffix = presenting ? '' : '?presenter';
    const originalLocation = location.href;
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
    if (presenting === false && window.PresentationRequest) {
      const presentationRequest = new PresentationRequest([
        `${originalLocation}`
      ]);
      navigator.presentation.defaultRequest = presentationRequest;
      presentationRequest.start().then(connection => {
        this.presentationConnection = connection;
        this.presentationConnection.addEventListener('message', data => {
          this._goToSlide({ key: 'spectacle-slide', newValue: data.data });
        });
      });
    } else if (this.presentationConnection) {
      this.presentationConnection.terminate();
    }
  }
  _toggleTimerMode() {
    const isTimer =
      this.props.route.params.indexOf('presenter') !== -1 &&
      this.props.route.params.indexOf('timer') !== -1;
    const suffix = isTimer ? '?presenter' : '?presenter&timer';
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }
  _getSuffix() {
    if (this.props.route.params.indexOf('presenter') !== -1) {
      const isTimerMode = this.props.route.params.indexOf('timer') !== -1;
      return isTimerMode ? '?presenter&timer' : '?presenter';
    } else if (this.props.route.params.indexOf('overview') !== -1) {
      return '?overview';
    } else {
      return '';
    }
  }
  _goToSlide(e) {
    let data = null;
    let canNavigate = true;
    let offset = 0;
    if (e.key === 'spectacle-slide') {
      data = JSON.parse(e.newValue);
      canNavigate = this._checkFragments(this.props.route.slide, data.forward);
    } else if (e.slide) {
      data = e;
      offset = 1;

      const index = isNaN(parseInt(data.slide, 10))
        ? get(
            this.state.slideReference.find(slide => slide.id === data.slide),
            'rootIndex',
            0
          )
        : data.slide - 1;

      const msgData = JSON.stringify({
        slide: this._getHash(index),
        forward: false,
        time: Date.now()
      });

      localStorage.setItem('spectacle-slide', msgData);

      if (this.presentationConnection) {
        this.presentationConnection.send(msgData);
      }
    } else {
      return;
    }

    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex || 0
    });

    if (canNavigate) {
      let slide = data.slide;
      if (!isNaN(parseInt(slide, 10))) {
        slide = parseInt(slide, 10) - offset;
      }
      this.context.history.replace(`/${slide}${this._getSuffix()}`);
    }
  }

  _resetViewedIndexes() {
    this.viewedIndexes = new Set();
  }

  _prevSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex
    });
    this.viewedIndexes.delete(slideIndex);
    if (
      this._checkFragments(this.props.route.slide, false) ||
      this.props.route.params.indexOf('overview') !== -1
    ) {
      if (slideIndex > 0) {
        this.context.history.replace(
          `/${this._getHash(slideIndex - 1)}${this._getSuffix()}`
        );

        const msgData = JSON.stringify({
          slide: this._getHash(slideIndex - 1),
          forward: false,
          time: Date.now()
        });

        localStorage.setItem('spectacle-slide', msgData);

        if (this.presentationConnection) {
          this.presentationConnection.send(msgData);
        }
      }
    } else if (slideIndex > 0) {
      const msgData = JSON.stringify({
        slide: this._getHash(slideIndex),
        forward: false,
        time: Date.now()
      });

      localStorage.setItem('spectacle-slide', msgData);

      if (this.presentationConnection) {
        this.presentationConnection.send(msgData);
      }
    }
  }
  _nextUnviewedIndex() {
    const sortedIndexes = Array.from(this.viewedIndexes).sort((a, b) => a - b);
    return Math.min(
      (sortedIndexes[sortedIndexes.length - 1] || 0) + 1,
      this.state.slideReference.length - 1
    );
  }
  _getOffset(slideIndex) {
    const { goTo } = this.state.slideReference[slideIndex];
    const nextUnviewedIndex = this._nextUnviewedIndex();
    if (goTo && !isNaN(parseInt(goTo))) {
      const goToIndex = () => {
        if (this.viewedIndexes.has(goTo - 1)) {
          return this._nextUnviewedIndex();
        }
        return goTo - 1;
      };
      return goToIndex() - slideIndex;
    }
    return nextUnviewedIndex - slideIndex;
  }
  _nextSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex
    });
    const slideReference = this.state.slideReference;
    if (
      this._checkFragments(this.props.route.slide, true) ||
      this.props.route.params.indexOf('overview') !== -1
    ) {
      if (slideIndex === slideReference.length - 1) {
        // On last slide, loop to first slide
        if (
          this.props.autoplay &&
          this.props.autoplayLoop &&
          this.state.autoplaying
        ) {
          const slideData = '{ "slide": "0", "forward": "false" }';
          this._goToSlide({ key: 'spectacle-slide', newValue: slideData });
          this._resetViewedIndexes();
        }
      } else if (slideIndex < slideReference.length - 1) {
        this.viewedIndexes.add(slideIndex);
        const offset = this._getOffset(slideIndex);
        this.context.history.replace(
          `/${this._getHash(slideIndex + offset) + this._getSuffix()}`
        );

        const msgData = JSON.stringify({
          slide: this._getHash(slideIndex + offset),
          forward: true,
          time: Date.now()
        });

        localStorage.setItem('spectacle-slide', msgData);

        if (this.presentationConnection) {
          this.presentationConnection.send(msgData);
        }
      }
    } else if (slideIndex < slideReference.length) {
      const msgData = JSON.stringify({
        slide: this._getHash(slideIndex),
        forward: true,
        time: Date.now()
      });

      localStorage.setItem('spectacle-slide', msgData);

      if (this.presentationConnection) {
        this.presentationConnection.send(msgData);
      }
    }
  }
  _getHash(slideIndex) {
    return this.state.slideReference[slideIndex].id;
  }
  _updateFragment(fragData) {
    return updateFragment(fragData);
  }
  _checkFragments(slide, forward) {
    const state = this.context.store.getState();
    const fragments = state.fragment.fragments;
    // Not proud of this at all. 0.14 Parent based contexts will fix this.
    if (this.props.route.params.indexOf('presenter') !== -1) {
      const main = document.querySelector('.spectacle-presenter-main');
      if (main) {
        const frags = main.querySelectorAll('.fragment');
        if (!frags.length) {
          return true;
        }
      } else {
        return true;
      }
    }
    if (slide in fragments) {
      const currentSlideFragments = fragments[slide];
      const count = size(currentSlideFragments);
      const fullyAnimated = filter(currentSlideFragments, frag =>
        frag.animations.every(anim => anim === true)
      );
      const notFullyAnimated = filter(
        currentSlideFragments,
        frag => !frag.animations.every(anim => anim === true)
      );

      if (forward === true && fullyAnimated.length !== count) {
        const target = notFullyAnimated[0];
        target.animations[target.animations.indexOf(false)] = true;
        this.props.dispatch(
          this._updateFragment({
            fragment: target,
            animations: target.animations
          })
        );
        return false;
      }
      if (forward === false) {
        if (
          notFullyAnimated.length === count &&
          notFullyAnimated.every(frag =>
            frag.animations.every(anim => anim === false)
          )
        ) {
          // If every fragment is animated back to square one, then switch slides
          return true;
        }

        let target;
        const lastFullyAnimatedFragment =
          fullyAnimated[size(fullyAnimated) - 1];
        const lastNotFullyAnimatedFragment = notFullyAnimated[0];
        if (
          fullyAnimated.length === count ||
          lastNotFullyAnimatedFragment.animations.every(a => a === false)
        ) {
          // if all fragments are fully animated, target the last fully animated fragment
          target = lastFullyAnimatedFragment;
        } else if (notFullyAnimated !== count) {
          // if some fragments are not fully animated, continue targeting that fragment
          target = lastNotFullyAnimatedFragment;
        }
        target.animations[target.animations.lastIndexOf(true)] = false;
        this.props.dispatch(
          this._updateFragment({
            fragment: target,
            animations: target.animations
          })
        );
        return false;
      }
      return true;
    } else {
      return true;
    }
  }
  _getTouchEvents() {
    const self = this;

    return {
      onTouchStart(e) {
        self.touchObject = {
          startX: e.touches[0].pageX,
          startY: e.touches[0].pageY
        };
      },
      onTouchMove(e) {
        const direction = self._swipeDirection({
          x1: self.touchObject.startX,
          x2: e.touches[0].pageX,
          y1: self.touchObject.startY,
          y2: e.touches[0].pageY
        });

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length: Math.round(
            Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2))
          ),
          direction
        };

        if (direction !== 0) {
          e.preventDefault();
        }
      },
      onTouchEnd(e) {
        self._handleSwipe(e);
      },
      onTouchCancel(e) {
        self._handleSwipe(e);
      }
    };
  }
  handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopPropagation();
    }
  }
  _handleSwipe() {
    if (
      typeof this.touchObject.length !== 'undefined' &&
      this.touchObject.length > 44
    ) {
      this.clickSafe = true;
    } else {
      this.clickSafe = false;
    }

    if (Math.abs(this.touchObject.length) > 20) {
      if (this.touchObject.direction === 1) {
        this._nextSlide();
      } else if (this.touchObject.direction === -1) {
        this._prevSlide();
      }
    }

    this.touchObject = {};
  }
  _swipeDirection(touch) {
    const xDist = touch.x1 - touch.x2;
    const yDist = touch.y1 - touch.y2;
    const r = Math.atan2(yDist, xDist);
    let swipeAngle = Math.round((r * 180) / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }
    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return 1;
    }
    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return 1;
    }
    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return -1;
    }

    return 0;
  }

  _getSlideIndex() {
    let index = parseInt(this.props.route.slide);
    if (!Number.isFinite(index)) {
      const foundIndex = findIndex(this.state.slideReference, reference => {
        return this.props.route.slide === reference.id;
      });
      index = foundIndex >= 0 ? foundIndex : 0;
    }
    return index;
  }
  _getSlideByIndex(index) {
    return getSlideByIndex(
      this.props.children,
      this.state.slideReference,
      index
    );
  }
  _renderSlide() {
    const slideIndex = this._getSlideIndex();
    const slide = this._getSlideByIndex(slideIndex);

    if (!slide) return null;

    const targetProps = {
      dispatch: this.props.dispatch,
      fragments: this.props.fragment,
      export: this.props.route.params.indexOf('export') !== -1,
      print: this.props.route.params.indexOf('print') !== -1,
      hash: this.props.route.slide,
      slideIndex,
      lastSlideIndex: this.state.lastSlideIndex,
      transition: (slide.props.transition || {}).length
        ? slide.props.transition
        : this.props.transition,
      transitionDuration: (slide.props.transition || {}).transitionDuration
        ? slide.props.transitionDuration
        : this.props.transitionDuration,
      slideReference: this.state.slideReference
    };

    return (
      <SlideWrapper key={slideIndex} {...slide.props} {...targetProps}>
        {cloneElement(slide, { ...slide.props, ...targetProps })}
      </SlideWrapper>
    );
  }
  _getProgressStyles() {
    const slideIndex = this._getSlideIndex();
    const slide = this._getSlideByIndex(slideIndex);

    if (slide && slide.props.progressColor) {
      return slide.props.progressColor;
    }
    return null;
  }
  _getControlStyles() {
    const slideIndex = this._getSlideIndex();
    const slide = this._getSlideByIndex(slideIndex);

    if (slide && slide.props.controlColor) {
      return slide.props.controlColor;
    }
    return null;
  }
  render() {
    if (this.props.route.slide === null) {
      return false;
    }

    const globals =
      this.props.route.params.indexOf('export') !== -1
        ? {
            body: Object.assign(this.context.styles.global.body, {
              minWidth: this.state.mobile
                ? '100vw'
                : this.props.contentWidth + 150,
              minHeight: this.props.contentHeight + 150,
              overflow: 'auto'
            }),
            '.spectacle-presenter-next .fragment': {
              display: 'none !important'
            }
          }
        : {
            '.spectacle-presenter-next .fragment': {
              display: 'none !important'
            }
          };

    let componentToRender;
    const children = Children.toArray(this.props.children);
    if (this.props.route.params.indexOf('presenter') !== -1) {
      const isTimerMode = this.props.route.params.indexOf('timer') !== -1;
      componentToRender = (
        <Presenter
          dispatch={this.props.dispatch}
          slides={children}
          slideReference={this.state.slideReference}
          slideIndex={this._getSlideIndex()}
          hash={this.props.route.slide}
          route={this.props.route}
          lastSlideIndex={this.state.lastSlideIndex}
          timer={isTimerMode}
        />
      );
    } else if (this.props.route.params.indexOf('export') !== -1) {
      componentToRender = (
        <Export
          slides={children}
          slideReference={this.state.slideReference}
          route={this.props.route}
        />
      );
    } else if (this.props.route.params.indexOf('overview') !== -1) {
      componentToRender = (
        <Overview
          slides={children}
          slideReference={this.state.slideReference}
          slideIndex={this._getSlideIndex()}
          route={this.props.route}
          resetViewedIndexes={this._resetViewedIndexes}
        />
      );
    } else {
      componentToRender = (
        <StyledTransition component="div">
          {this._renderSlide()}
        </StyledTransition>
      );
    }

    const showControls =
      !this.state.fullscreen &&
      !this.state.mobile &&
      this.props.route.params.indexOf('export') === -1 &&
      this.props.route.params.indexOf('overview') === -1 &&
      this.props.route.params.indexOf('presenter') === -1;

    const { googleFonts = {} } = this.context.styles;
    const googleFontsElements = Object.keys(googleFonts).map((key, index) => (
      <Typeface
        googleFont={googleFonts[key].name}
        styles={googleFonts[key].styles}
        key={`gFont-${index}`}
      />
    ));

    return (
      <StyledDeck
        className="spectacle-deck"
        route={this.props.route}
        onClick={this.handleClick}
        {...this._getTouchEvents()}
      >
        {this.props.controls &&
          showControls && (
            <Controls
              currentSlideIndex={this._getSlideIndex()}
              totalSlides={this.state.slideReference.length}
              onPrev={this._prevSlide.bind(this)}
              onNext={this._nextSlide.bind(this)}
              controlColor={this._getControlStyles()}
            />
          )}

        {googleFontsElements}
        {componentToRender}

        {this.props.route.params.indexOf('export') === -1 &&
        this.props.route.params.indexOf('overview') === -1 ? (
          <Progress
            items={this.state.slideReference}
            currentSlideIndex={this._getSlideIndex()}
            type={this.props.progress}
            progressColor={this._getProgressStyles()}
          />
        ) : (
          ''
        )}

        {this.props.showFullscreenControl &&
          !this.props.route.params.includes('export') && <Fullscreen />}

        {this.props.autoplay ? (
          <AutoplayControls
            autoplaying={this.state.autoplaying}
            onPlay={this._startAutoplay}
            onPause={this._stopAutoplay}
          />
        ) : (
          ''
        )}

        {this.props.globalStyles && (
          <style
            dangerouslySetInnerHTML={{
              __html: convertStyle(
                Object.assign({}, this.context.styles.global, globals)
              )
            }}
          />
        )}
      </StyledDeck>
    );
  }
}

export default connect(
  state => state,
  null,
  null,
  { withRef: true }
)(Manager);
