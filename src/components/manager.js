/*eslint new-cap:0, max-statements:0*/
/* eslint react/no-did-mount-set-state: 0, complexity: [1, 16] */

import React, { Children, cloneElement, Component, PropTypes } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import Radium, { Style } from "radium";
import filter from "lodash/filter";
import size from "lodash/size";
import findIndex from "lodash/findIndex";
import findLastIndex from "lodash/findLastIndex";
import isUndefined from "lodash/isUndefined";
import { connect } from "react-redux";
import { setGlobalStyle, updateFragment } from "../actions";
import Typeface from "./typeface";
import { getSlideByIndex } from "../utils/slides";
import { codes } from "../utils/keycodes";

import Presenter from "./presenter";
import Export from "./export";
import Overview from "./overview";

import Fullscreen from "./fullscreen";
import Progress from "./progress";
import Controls from "./controls";
const TransitionGroup = Radium(ReactTransitionGroup);

@connect((state) => state)
@Radium
export default class Manager extends Component {
  static displayName = "Manager";

  static defaultProps = {
    transitionDuration: 500,
    progress: "pacman",
    controls: true,
    globalStyles: true
  };

  static propTypes = {
    children: PropTypes.node,
    controls: PropTypes.bool,
    dispatch: PropTypes.func,
    fragment: PropTypes.object,
    globalStyles: PropTypes.bool,
    progress: PropTypes.oneOf(["pacman", "bar", "number", "none"]),
    route: PropTypes.object,
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

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleScreenChange = this._handleScreenChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this._goToSlide = this._goToSlide.bind(this);
    this.state = {
      lastSlideIndex: null,
      slideReference: [],
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < 1000,
      overview: props.route.params.indexOf("overview") !== -1,
      presenter: props.route.params.indexOf("presenter") !== -1,
      export: props.route.params.indexOf("export") !== -1,
      print: props.route.params.indexOf("print") !== -1
    };
  }

  componentWillMount() {
    this.setState({
      slideReference: this._buildSlideReference()
    });
  }
  componentDidMount() {
    const slideIndex = this._getSlideIndex();
    this.setState({
      lastSlideIndex: slideIndex
    });
    this._attachEvents();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      overview: nextProps.route.params.indexOf("overview") !== -1,
      presenter: nextProps.route.params.indexOf("presenter") !== -1,
      export: nextProps.route.params.indexOf("export") !== -1,
      print: nextProps.route.params.indexOf("print") !== -1
    });
  }
  componentDidUpdate() {
    if (this.props.globalStyles && !this.context.store.getState().style.globalStyleSet) {
      this.props.dispatch(setGlobalStyle());
    }
  }
  componentWillUnmount() {
    this._detachEvents();
  }
  _attachEvents() {
    window.addEventListener("storage", this._goToSlide);
    window.addEventListener("keydown", this._handleKeyPress);
    window.addEventListener("resize", this._handleScreenChange);
  }
  _detachEvents() {
    window.removeEventListener("storage", this._goToSlide);
    window.removeEventListener("keydown", this._handleKeyPress);
    window.removeEventListener("resize", this._handleScreenChange);
  }
  _handleEvent(e) {
    const event = window.event ? window.event : e;

    if (event.keyCode === codes.left) {
      if (this.state.overview) {
        this._leftSlide();
      } else {
        this._prevSlide();
      }
    } else if (event.keyCode === codes.pageUp || event.keyCode === codes.up) {
      if (this.state.overview) {
        this._upSlide();
      } else {
        this._prevSlide();
      }
    } else if (event.keyCode === codes.space && event.shiftKey) {
      this._prevSlide();
    } else if (event.keyCode === codes.right) {
      if (this.state.overview) {
        this._rightSlide();
      } else {
        this._nextSlide();
      }
    } else if (event.keyCode === codes.pageDown || event.keyCode === codes.down) {
      if (this.state.overview) {
        this._downSlide();
      } else {
        this._nextSlide();
      }
    } else if (event.keyCode === codes.space && !event.shiftKey) {
      this._nextSlide();
    } else if ((event.altKey && event.keyCode === codes.o) && !event.ctrlKey && !event.metaKey) {
      this._toggleOverviewMode();
    } else if ((event.altKey && event.keyCode === codes.p) && !event.ctrlKey && !event.metaKey) {
      this._togglePresenterMode();
    }
  }
  _handleKeyPress(e) {
    const event = window.event ? window.event : e;
    if (event.target instanceof HTMLInputElement || event.target.type === "textarea") {
      return;
    }
    this._handleEvent(e);
  }
  _handleScreenChange() {
    this.setState({
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < 1000
    });
  }
  _toggleOverviewMode() {
    const suffix = this.state.overview ? "" : "?overview";
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }
  _togglePresenterMode() {
    const suffix = this.state.presenter ? "" : "?presenter";
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }
  _getSuffix() {
    if (this.state.presenter) {
      return "?presenter";
    } else if (this.state.overview) {
      return "?overview";
    } else {
      return "";
    }
  }
  _goToSlide(e) {
    if (e.key === "spectacle-slide") {
      const data = JSON.parse(e.newValue);
      const slideIndex = this._getSlideIndex();
      this.setState({
        lastSlideIndex: slideIndex || 0
      });
      if (this._checkFragments(this.props.route.slide, data.forward)) {
        this.context.history.replace(`/${data.slide}${this._getSuffix()}`);
      }
    }
  }
  _setLocalStorageSlide(slideIndex, forward) {
    localStorage.setItem("spectacle-slide",
        JSON.stringify({ slide: this._getHash(slideIndex), forward, time: Date.now() }));
  }
  _navigateToSlide(slideIndex, suffix) {
    this.context.history.replace(`/${this._getHash(slideIndex)}${suffix}`);
  }
  // Goes to previous slide in series
  // TODO: re-evaluate `slideIndex > 0` checks
  _prevSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({ lastSlideIndex: slideIndex });
    if (this.state.overview || this._checkFragments(this.props.route.slide, false)) {
      if (slideIndex > 0) {
        this._navigateToSlide(slideIndex - 1, this._getSuffix());
        this._setLocalStorageSlide(slideIndex - 1, false);
      }
    } else if (slideIndex > 0) {
      this._setLocalStorageSlide(slideIndex, false);
    }
  }
  // Goes to next slide in series
  // TODO: re-evaluate `slideIndex < this.state.slideReference.length - 1` checks
  _nextSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({ lastSlideIndex: slideIndex });
    if (this.state.overview || this._checkFragments(this.props.route.slide, true)) {
      if (slideIndex < this.state.slideReference.length - 1) {
        this._navigateToSlide(slideIndex + 1, this._getSuffix());
        this._setLocalStorageSlide(slideIndex + 1, true);
      }
    } else if (slideIndex < this.state.slideReference.length - 1) {
      this._setLocalStorageSlide(slideIndex, true);
    }
  }
  /*
    Goes to slide closest to the right in 2D grid of slides
    * if not in a SlideSet, goes to next slide
    * if in a SlideSet
      * if next slide is a SlideSet, goes to slide with the same index within the next set
      * if next slide is not a SlideSet, goes to next slide not in current set
  */
  _rightSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({ lastSlideIndex: slideIndex });
    const reference = this.state.slideReference[slideIndex];
    const nextRootSlideIndex = findIndex(
      this.state.slideReference,
      (r) => r.rootIndex === reference.rootIndex + 1,
      slideIndex + 1
    );
    // if there's another root to jump to
    if (nextRootSlideIndex > slideIndex) {
      let nextSlideIndex = nextRootSlideIndex;
      if (!isUndefined(reference.setIndex) &&
          !isUndefined(this.state.slideReference[nextRootSlideIndex].setIndex)) {
        nextSlideIndex = findLastIndex(
          this.state.slideReference,
          (r) => r.rootIndex === reference.rootIndex + 1 && r.setIndex <= reference.setIndex
        );
      }
      this._navigateToSlide(nextSlideIndex, this._getSuffix());
      this._setLocalStorageSlide(nextSlideIndex, true);
    }
  }
  /*
    Goes to slide closest to the left in 2D grid of slides
    * if not in a SlideSet, goes to root of previous slide/set
    * if in a SlideSet
      * if prev slide is a SlideSet, goes to slide with the same index within the next set
      * if prev slide is not a SlideSet, goes to prev slide not in current set
  */
  _leftSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({ lastSlideIndex: slideIndex });
    const reference = this.state.slideReference[slideIndex];
    if (reference.rootIndex > 0) {
      const prevRootSlideIndex = findIndex(
        this.state.slideReference,
        (r) => r.rootIndex === reference.rootIndex - 1
      );
      let prevSlideIndex = prevRootSlideIndex;
      if (!isUndefined(reference.setIndex) &&
          !isUndefined(this.state.slideReference[prevRootSlideIndex].setIndex)) {
        prevSlideIndex = findLastIndex(
          this.state.slideReference,
          (r) => r.rootIndex === reference.rootIndex - 1 && r.setIndex <= reference.setIndex,
          slideIndex
        );
      }
      this._navigateToSlide(prevSlideIndex, this._getSuffix());
      this._setLocalStorageSlide(prevSlideIndex, true);
    }
  }
  // If slide is in a SlideSet, go to previous in set. If not in a set, do nothing.
  _upSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({ lastSlideIndex: slideIndex });
    const reference = this.state.slideReference[slideIndex];
    if (!isUndefined(reference.setIndex) && reference.setIndex > 0) {
      this._navigateToSlide(slideIndex - 1, this._getSuffix());
      this._setLocalStorageSlide(slideIndex - 1, true);
    }
  }
  // If slide is in a SlideSet, go to next in set. If not in a set, do nothing.
  _downSlide() {
    const slideIndex = this._getSlideIndex();
    this.setState({ lastSlideIndex: slideIndex });
    const reference = this.state.slideReference[slideIndex];
    if (!isUndefined(reference.setIndex)) {
      const nextReference = this.state.slideReference[slideIndex + 1];
      if (nextReference.rootIndex === reference.rootIndex) {
        this._navigateToSlide(slideIndex + 1, this._getSuffix());
        this._setLocalStorageSlide(slideIndex + 1, true);
      }
    }
  }
  _getHash(slideIndex) {
    return this.state.slideReference[slideIndex].id;
  }
  /*
    _checkFragments does two things when run:
    1. Checks if there are fragments (navigable portions of slides) to show/hide as part of
       navigation and returns true/false depending on whether we're clear to navigate.
       * Note: by default slides have no fragments and will just return true
    2. In the process of checking fragments, if a fragment requires updating, fragment visibility
       for the next forward/backward fragment is updated in the redux store.

    Returns:
    * `true` if no fragments to modify and we're good to navigate to other slide
    * `false` if fragments require updating as part of navigation
  */
  _checkFragments(slide, forward) {
    const state = this.context.store.getState();
    const fragments = state.fragment.fragments;
    // Not proud of this at all. 0.14 Parent based contexts will fix this.
    if (this.state.presenter) {
      const main = document.querySelector(".spectacle-presenter-main");
      if (main) {
        const frags = main.querySelectorAll(".fragment");
        if (!frags.length) {
          return true;
        }
      } else {
        return true;
      }
    }
    if (slide in fragments) {
      const count = size(fragments[slide]);
      const visible = filter(fragments[slide], (s) => s.visible === true);
      const hidden = filter(fragments[slide], (s) => s.visible !== true);
      if (forward === true && visible.length !== count) {
        this.props.dispatch(updateFragment({
          fragment: hidden[0],
          visible: true
        }));
        return false;
      }
      if (forward === false && hidden.length !== count) {
        this.props.dispatch(updateFragment({
          fragment: visible[size(visible) - 1],
          visible: false
        }));
        return false;
      }
    }
    return true;
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
          length: Math.round(Math.sqrt(Math.pow(e.touches[0].pageX - self.touchObject.startX, 2))),
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
    if (typeof (this.touchObject.length) !== "undefined" && this.touchObject.length > 44) {
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
    if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
      return 1;
    }
    if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
      return 1;
    }
    if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
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
          rootIndex
        });
      } else {
        child.props.children.forEach((setSlide, setIndex) => {
          slideReference.push({
            id: setSlide.props.id || slideReference.length,
            setIndex,
            rootIndex
          });
        });
      }
    });
    return slideReference;
  }
  _getSlideIndex() {
    let index = parseInt(this.props.route.slide);
    if (!Number.isFinite(index)) {
      const foundIndex = findIndex(this.state.slideReference, (reference) => {
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
      export: this.state.export,
      print: this.state.print,
      children: Children.toArray(slide.props.children),
      hash: this.props.route.slide,
      slideIndex,
      lastSlideIndex: this.state.lastSlideIndex,
      transition: (slide.props.transition || {}).length ?
        slide.props.transition :
        this.props.transition,
      transitionDuration: (slide.props.transition || {}).transitionDuration ?
        slide.props.transitionDuration :
        this.props.transitionDuration
    });
  }
  render() {
    const globals = this.state.export ? {
      body: Object.assign(this.context.styles.global.body, {
        minWidth: 1100,
        minHeight: 850,
        overflow: "auto"
      }),
      ".spectacle-presenter-next .fragment": {
        display: "none !important"
      }
    } : {
      ".spectacle-presenter-next .fragment": {
        display: "none !important"
      }
    };

    const styles = {
      deck: {
        backgroundColor: this.state.presenter || this.state.overview ? "black" : "",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
      },
      transition: {
        height: "100%",
        width: "100%",
        perspective: 1000,
        transformStyle: "flat"
      }
    };

    let componentToRender;
    const children = Children.toArray(this.props.children);
    if (this.state.presenter) {
      componentToRender = (
        <Presenter
          dispatch={this.props.dispatch}
          slides={children}
          slideReference={this.state.slideReference}
          slideIndex={this._getSlideIndex()}
          hash={this.props.route.slide}
          route={this.props.route}
          lastSlideIndex={this.state.lastSlideIndex}
        />
      );
    } else if (this.state.export) {
      componentToRender = (
        <Export
          slides={children}
          slideReference={this.state.slideReference}
          route={this.props.route}
        />
      );
    } else if (this.state.overview) {
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
        </TransitionGroup>);
    }

    const showControls = !this.state.fullscreen &&
      !this.state.mobile &&
      !this.state.export &&
      !this.state.overview &&
      !this.state.presenter;

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
        {this.props.controls && showControls &&
            <Controls
              currentSlideIndex={this._getSlideIndex()}
              totalSlides={this.state.slideReference.length}
              onPrev={this._prevSlide.bind(this)}
              onNext={this._nextSlide.bind(this)}
            />}

        {googleFontsElements}
        {componentToRender}

        {
          !this.state.export && !this.state.overview ?
          <Progress
            items={this.state.slideReference}
            currentSlideIndex={this._getSlideIndex()}
            type={this.props.progress}
          /> : ""
        }

        {
          !this.state.export ?
           <Fullscreen/> : ""
        }

        {this.props.globalStyles && <Style rules={Object.assign(this.context.styles.global, globals)} />}
      </div>
    );
  }
}
