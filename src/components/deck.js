/*eslint new-cap:0, max-statements:0*/
/* eslint react/no-did-mount-set-state: 0 */

import React, { Children, cloneElement, Component, PropTypes } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import Radium, { Style } from "radium";
import _ from "lodash";
import { connect } from "react-redux";
import { updateFragment } from "../actions";

import Presenter from "./presenter";
import Export from "./export";
import Overview from "./overview";

import Fullscreen from "./fullscreen";
import Progress from "./progress";
import Controls from "./controls";
const TransitionGroup = Radium(ReactTransitionGroup);

@connect((state) => state)
@Radium
export default class Deck extends Component {
  static displayName = "Deck";

  static defaultProps = {
    transitionDuration: 500,
    progress: "pacman",
    controls: true
  };

  static propTypes = {
    controls: PropTypes.bool,
    fragment: PropTypes.object,
    dispatch: PropTypes.func,
    children: PropTypes.node,
    route: PropTypes.object,
    transition: PropTypes.array,
    transitionDuration: PropTypes.number,
    progress: PropTypes.oneOf(["pacman", "bar", "number", "none"])
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

  constructor() {
    super();
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleScreenChange = this._handleScreenChange.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._goToSlide = this._goToSlide.bind(this);
    this.state = {
      lastSlide: null,
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < 1000
    };
  }

  componentDidMount() {
    const slide = this._getSlideIndex();
    this.setState({
      lastSlide: slide
    });
    this._attachEvents();
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

    if (event.keyCode === 37 || event.keyCode === 33 || (event.keyCode === 32 && event.shiftKey)) {
      this._prevSlide();
    } else if (event.keyCode === 39 || event.keyCode === 34 || (event.keyCode === 32 && !event.shiftKey)) {
      this._nextSlide();
    } else if ((event.altKey && event.keyCode === 79) && !event.ctrlKey && !event.metaKey) { // o
      this._toggleOverviewMode();
    } else if ((event.altKey && event.keyCode === 80) && !event.ctrlKey && !event.metaKey) { // p
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
    const suffix = this.props.route.params.indexOf("overview") !== -1 ? "" : "?overview";
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }
  _togglePresenterMode() {
    const suffix = this.props.route.params.indexOf("presenter") !== -1 ? "" : "?presenter";
    this.context.history.replace(`/${this.props.route.slide}${suffix}`);
  }
  _getSuffix() {
    if (this.props.route.params.indexOf("presenter") !== -1) {
      return "?presenter";
    } else if (this.props.route.params.indexOf("overview") !== -1) {
      return "?overview";
    } else {
      return "";
    }
  }
  _goToSlide(e) {
    if (e.key === "spectacle-slide") {
      const data = JSON.parse(e.newValue);
      const slide = this._getSlideIndex();
      this.setState({
        lastSlide: slide || 0
      });
      if (this._checkFragments(this.props.route.slide, data.forward)) {
        this.context.history.replace(`/${data.slide}${this._getSuffix()}`);
      }
    }
  }
  _prevSlide() {
    const slide = this._getSlideIndex();
    this.setState({
      lastSlide: slide
    });
    if (this._checkFragments(this.props.route.slide, false) || this.props.route.params.indexOf("overview") !== -1) {
      if (slide > 0) {
        this.context.history.replace(`/${this._getHash(slide - 1)}${this._getSuffix()}`);
        localStorage.setItem("spectacle-slide",
          JSON.stringify({slide: this._getHash(slide - 1), forward: false, time: Date.now()}));
      }
    } else if (slide > 0) {
      localStorage.setItem("spectacle-slide",
        JSON.stringify({slide: this._getHash(slide), forward: false, time: Date.now()}));
    }
  }
  _nextSlide() {
    const slide = this._getSlideIndex();
    this.setState({
      lastSlide: slide
    });
    if (this._checkFragments(this.props.route.slide, true) || this.props.route.params.indexOf("overview") !== -1) {
      if (slide < this.props.children.length - 1) {
        this.context.history.replace(`/${this._getHash(slide + 1) + this._getSuffix()}`);
        localStorage.setItem("spectacle-slide",
          JSON.stringify({slide: this._getHash(slide + 1), forward: true, time: Date.now()}));
      }
    } else if (slide < this.props.children.length) {
      localStorage.setItem("spectacle-slide",
        JSON.stringify({slide: this._getHash(slide), forward: true, time: Date.now()}));
    }
  }
  _getHash(slide) {
    let hash = slide;
    const children = React.Children.toArray(this.props.children);
    if ("id" in children[slide].props) {
      hash = children[slide].props.id;
    }
    return hash;
  }
  _checkFragments(slide, forward) {
    const state = this.context.store.getState();
    const fragments = state.fragment.fragments;
    // Not proud of this at all. 0.14 Parent based contexts will fix this.
    if (this.props.route.params.indexOf("presenter") !== -1) {
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
      const count = _.size(fragments[slide]);
      const visible = _.filter(fragments[slide], (s) => s.visible === true);
      const hidden = _.filter(fragments[slide], (s) => s.visible !== true);
      if (forward === true && visible.length !== count) {
        this.props.dispatch(updateFragment({
          fragment: hidden[0],
          visible: true
        }));
        return false;
      }
      if (forward === false && hidden.length !== count) {
        this.props.dispatch(updateFragment({
          fragment: visible[_.size(visible) - 1],
          visible: false
        }));
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
  _handleClick(e) {
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
  _getSlideIndex() {
    let index = 0;
    if (!parseInt(this.props.route.slide)) {
      Children.toArray(this.props.children).forEach((slide, i) => {
        if (slide.props.id === this.props.route.slide) {
          index = i;
        }
      });
    } else {
      index = parseInt(this.props.route.slide);
    }
    return index;
  }
  _renderSlide() {
    const slide = this._getSlideIndex();
    const child = Children.toArray(this.props.children)[slide];
    return cloneElement(child, {
      dispatch: this.props.dispatch,
      fragments: this.props.fragment,
      key: slide,
      export: this.props.route.params.indexOf("export") !== -1,
      print: this.props.route.params.indexOf("print") !== -1,
      children: Children.toArray(child.props.children),
      hash: this.props.route.slide,
      slideIndex: slide,
      lastSlide: this.state.lastSlide,
      transition: child.props.transition.length ?
        child.props.transition :
        this.props.transition,
      transitionDuration: child.props.transition.transitionDuration ?
        child.props.transitionDuration :
        this.props.transitionDuration
    });
  }
  render() {
    const globals = this.props.route.params.indexOf("export") !== -1 ? {
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
        backgroundColor: this.props.route.params.indexOf("presenter") !== -1 || this.props.route.params.indexOf("overview") !== -1 ? "black" : "",
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
    if (this.props.route.params.indexOf("presenter") !== -1) {
      componentToRender = (
        <Presenter
          dispatch={this.props.dispatch}
          slides={children}
          slide={this._getSlideIndex()}
          hash={this.props.route.slide}
          route={this.props.route}
          lastSlide={this.state.lastSlide}
        />
      );
    } else if (this.props.route.params.indexOf("export") !== -1) {
      componentToRender = <Export slides={children} route={this.props.route} />;
    } else if (this.props.route.params.indexOf("overview") !== -1) {
      componentToRender = <Overview slides={children} slide={this._getSlideIndex()} route={this.props.route} />;
    } else {
      componentToRender = (
        <TransitionGroup component="div" style={[styles.transition]}>
          {this._renderSlide()}
        </TransitionGroup>);

    }

    const showControls = !this.state.fullscreen &&
      !this.state.mobile &&
      this.props.route.params.indexOf("export") === -1 &&
      this.props.route.params.indexOf("overview") === -1 &&
      this.props.route.params.indexOf("presenter") === -1;

    return (
      <div
        className="spectacle-deck"
        style={[styles.deck]}
        onClick={this._handleClick}
        {...this._getTouchEvents()}
      >
        {this.props.controls && showControls &&
            <Controls
              currentSlide={this._getSlideIndex()}
              totalSlides={children.length}
              onPrev={this._prevSlide.bind(this)}
              onNext={this._nextSlide.bind(this)}
            />}

        {componentToRender}

        {
          this.props.route.params.indexOf("export") === -1 && this.props.route.params.indexOf("overview") === -1 ?
          <Progress
            items={children}
            currentSlide={this._getSlideIndex()}
            type={this.props.progress}
          /> : ""
        }

        {
          this.props.route.params.indexOf("export") === -1 ?
           <Fullscreen/> : ""
        }

        <Style rules={Object.assign(this.context.styles.global, globals)} />
      </div>
    );
  }
}
