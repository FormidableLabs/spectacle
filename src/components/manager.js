/*eslint new-cap:0, max-statements:0*/
/* eslint react/no-did-mount-set-state: 0 */

import React, { Children, cloneElement, Component } from 'react';
import PropTypes from 'prop-types';
import ReactTransitionGroup from 'react-transition-group/TransitionGroup';
import Radium, { Style } from 'radium';
import filter from 'lodash/filter';
import size from 'lodash/size';
import findIndex from 'lodash/findIndex';
import { connect } from 'react-redux';
import { setGlobalStyle, updateFragment } from '../actions';
import Typeface from './typeface';
import { getSlideByIndex } from '../utils/slides';

import Presenter from './presenter';
import Export from './export';
import Overview from './overview';

import AutoplayControls from './autoplay-controls';
import Fullscreen from './fullscreen';
import Progress from './progress';
import Controls from './controls';
const TransitionGroup = Radium(ReactTransitionGroup);

@connect(state => state)
@Radium
export default class Manager extends Component {
  static displayName = 'Manager';

  static defaultProps = {
    autoplay: false,
    autoplayDuration: 7000,
    contentWidth: 1000,
    contentHeight: 700,
    transition: [],
    transitionDuration: 500,
    progress: 'pacman',
    controls: true,
    globalStyles: true,
  };

  static propTypes = {
    autoplay: PropTypes.bool,
    autoplayDuration: PropTypes.number,
    children: PropTypes.node,
    contentHeight: PropTypes.number,
    contentWidth: PropTypes.number,
    controls: PropTypes.bool,
    dispatch: PropTypes.func,
    fragment: PropTypes.object,
    globalStyles: PropTypes.bool,
    progress: PropTypes.oneOf(['pacman', 'bar', 'number', 'none']),
    route: PropTypes.object,
    transition: PropTypes.array,
    transitionDuration: PropTypes.number,
  };

  static contextTypes = {
    styles: PropTypes.object,
    print: PropTypes.object,
    history: PropTypes.object,
    presenter: PropTypes.bool,
    export: PropTypes.bool,
    overview: PropTypes.bool,
    store: PropTypes.object,
    slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  };

  static childContextTypes = {
    contentWidth: PropTypes.number,
    contentHeight: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleScreenChange = this._handleScreenChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this._goToSlide = this._goToSlide.bind(this);
    this._startAutoplay = this._startAutoplay.bind(this);
    this._stopAutoplay = this._stopAutoplay.bind(this);
    this.state = {
      lastSlideIndex: null,
      slideReference: [],
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < props.contentWidth,
      autoplaying: props.autoplay,
    };
  }

  getChildContext() {
    return {
      contentWidth: this.props.contentWidth,
      contentHeight: this.props.contentHeight,
    };
  }

  componentWillMount() {
    this.setState({
      slideReference: this._buildSlideReference(),
    });
  }
  componentDidMount() {
    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex,
    });
    this._attachEvents();
    if (this.props.autoplay) {
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
  _handleEvent(e) { // eslint-disable-line complexity
    const event = window.event ? window.event : e;

    if (
      event.keyCode === 37 ||
      event.keyCode === 33 ||
      (event.keyCode === 32 && event.shiftKey)
    ) {
      this._prevSlide();
      this._stopAutoplay();
    } else if (
      event.keyCode === 39 ||
      event.keyCode === 34 ||
      (event.keyCode === 32 && !event.shiftKey)
    ) {
      this._nextSlide();
      this._stopAutoplay();
    } else if (
      event.altKey &&
      event.keyCode === 79 &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      // o
      this._toggleOverviewMode();
    } else if (
      event.altKey &&
      event.keyCode === 80 &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      // p
      this._togglePresenterMode();
    } else if (
      event.altKey &&
      event.keyCode === 84 &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      // t
      this._toggleTimerMode();
    } else if (
      event.altKey &&
      event.keyCode === 65 &&
      !event.ctrlKey &&
      !event.metaKey
    ) {
      // a
      if (this.props.autoplay) {
        this._startAutoplay();
      }
    }
  }
  _handleKeyPress(e) {
    const event = window.event ? window.event : e;

    if (
      event.target instanceof HTMLInputElement ||
      event.target.type === 'textarea'
    ) {
      return;
    }

    this._handleEvent(e);
  }
  _handleScreenChange() {
    this.setState({
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < this.props.contentWidth,
    });
  }
  _toggleOverviewMode() {
    const suffix = this.props.route.params.indexOf('overview') !== -1
      ? ''
      : '?overview';
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }
  _togglePresenterMode() {
    const suffix = this.props.route.params.indexOf('presenter') !== -1
      ? ''
      : '?presenter';
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
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
    if (e.key === 'spectacle-slide') {
      const data = JSON.parse(e.newValue);
      const slideIndex = this._getSlideIndex();
      this.setState({
        lastSlideIndex: slideIndex || 0,
      });
      if (this._checkFragments(this.props.route.slide, data.forward)) {
        this.context.history.replace(`/${data.slide}${this._getSuffix()}`);
      }
    }
  }
  _prevSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex,
    });
    if (
      this._checkFragments(this.props.route.slide, false) ||
      this.props.route.params.indexOf('overview') !== -1
    ) {
      if (slideIndex > 0) {
        this.context.history.replace(
          `/${this._getHash(slideIndex - 1)}${this._getSuffix()}`
        );
        localStorage.setItem(
          'spectacle-slide',
          JSON.stringify({
            slide: this._getHash(slideIndex - 1),
            forward: false,
            time: Date.now(),
          })
        );
      }
    } else if (slideIndex > 0) {
      localStorage.setItem(
        'spectacle-slide',
        JSON.stringify({
          slide: this._getHash(slideIndex),
          forward: false,
          time: Date.now(),
        })
      );
    }
  }
  _nextSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex,
    });
    const slideReference = this.state.slideReference;
    if (
      this._checkFragments(this.props.route.slide, true) ||
      this.props.route.params.indexOf('overview') !== -1
    ) {
      if (slideIndex === slideReference.length - 1) {
        // On last slide, loop to first slide
        if (this.props.autoplay && this.state.autoplaying) {
          const slideData = '{ "slide": "0", "forward": "false" }';
          this._goToSlide({ key: 'spectacle-slide', newValue: slideData });
        }
      } else if (slideIndex < slideReference.length - 1) {
        this.context.history.replace(
          `/${this._getHash(slideIndex + 1) + this._getSuffix()}`
        );
        localStorage.setItem(
          'spectacle-slide',
          JSON.stringify({
            slide: this._getHash(slideIndex + 1),
            forward: true,
            time: Date.now(),
          })
        );
      }
    } else if (slideIndex < slideReference.length) {
      localStorage.setItem(
        'spectacle-slide',
        JSON.stringify({
          slide: this._getHash(slideIndex),
          forward: true,
          time: Date.now(),
        })
      );
    }
  }
  _getHash(slideIndex) {
    return this.state.slideReference[slideIndex].id;
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
      const count = size(fragments[slide]);
      const visible = filter(fragments[slide], s => s.visible === true);
      const hidden = filter(fragments[slide], s => s.visible !== true);
      if (forward === true && visible.length !== count) {
        this.props.dispatch(
          updateFragment({
            fragment: hidden[0],
            visible: true,
          })
        );
        return false;
      }
      if (forward === false && hidden.length !== count) {
        this.props.dispatch(
          updateFragment({
            fragment: visible[size(visible) - 1],
            visible: false,
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
          startY: e.touches[0].pageY,
        };
      },
      onTouchMove(e) {
        const direction = self._swipeDirection({
          x1: self.touchObject.startX,
          x2: e.touches[0].pageX,
          y1: self.touchObject.startY,
          y2: e.touches[0].pageY,
        });

        self.touchObject = {
          startX: self.touchObject.startX,
          startY: self.touchObject.startY,
          endX: e.clientX,
          endY: e.clientY,
          length: Math.round(
            Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2))
          ),
          direction,
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
      },
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
    let swipeAngle = Math.round(r * 180 / Math.PI);

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
  _buildSlideReference() {
    const slideReference = [];
    Children.toArray(this.props.children).forEach((child, rootIndex) => {
      if (!child.props.hasSlideChildren) {
        slideReference.push({
          id: child.props.id || slideReference.length,
          rootIndex,
        });
      } else {
        child.props.children.forEach((setSlide, setIndex) => {
          slideReference.push({
            id: setSlide.props.id || slideReference.length,
            setIndex,
            rootIndex,
          });
        });
      }
    });
    return slideReference;
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
    return cloneElement(slide, {
      dispatch: this.props.dispatch,
      fragments: this.props.fragment,
      key: slideIndex,
      export: this.props.route.params.indexOf('export') !== -1,
      print: this.props.route.params.indexOf('print') !== -1,
      children: Children.toArray(slide.props.children),
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
    });
  }
  render() {
    if (this.props.route.slide === null) {
      return false;
    }

    const globals = this.props.route.params.indexOf('export') !== -1
      ? {
          body: Object.assign(this.context.styles.global.body, {
            minWidth: this.props.contentWidth + 150,
            minHeight: this.props.contentHeight + 150,
            overflow: 'auto',
          }),
          '.spectacle-presenter-next .fragment': {
            display: 'none !important',
          },
        }
      : {
          '.spectacle-presenter-next .fragment': {
            display: 'none !important',
          },
        };

    const styles = {
      deck: {
        backgroundColor: this.props.route.params.indexOf('presenter') !== -1 ||
          this.props.route.params.indexOf('overview') !== -1
          ? 'black'
          : '',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
      transition: {
        height: '100%',
        width: '100%',
        perspective: 1000,
        transformStyle: 'flat',
      },
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
        />
      );
    } else {
      componentToRender = (
        <TransitionGroup component="div" style={[styles.transition]}>
          {this._renderSlide()}
        </TransitionGroup>
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
      <div
        className="spectacle-deck"
        style={[styles.deck]}
        onClick={this.handleClick}
        {...this._getTouchEvents()}
      >
        {this.props.controls &&
          showControls &&
          <Controls
            currentSlideIndex={this._getSlideIndex()}
            totalSlides={this.state.slideReference.length}
            onPrev={this._prevSlide.bind(this)}
            onNext={this._nextSlide.bind(this)}
          />}

        {googleFontsElements}
        {componentToRender}

        {this.props.route.params.indexOf('export') === -1 &&
          this.props.route.params.indexOf('overview') === -1
          ? <Progress
              items={this.state.slideReference}
              currentSlideIndex={this._getSlideIndex()}
              type={this.props.progress}
            />
          : ''}

        {this.props.route.params.indexOf('export') === -1 ? <Fullscreen /> : ''}

        {this.props.autoplay
          ? <AutoplayControls
              autoplaying={this.state.autoplaying}
              onPlay={this._startAutoplay}
              onPause={this._stopAutoplay}
            />
          : ''}

        {this.props.globalStyles &&
          <Style rules={Object.assign(this.context.styles.global, globals)} />}
      </div>
    );
  }
}
