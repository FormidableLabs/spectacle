/*eslint new-cap:0, max-statements:0*/
/* eslint react/no-did-mount-set-state: 0 */

import React, { Children, cloneElement, Component, PropTypes } from "react";
import ReactTransitionGroup from "react-addons-transition-group";
import Radium, { Style } from "radium";
import _ from "lodash";
import Presenter from "./presenter";
import Export from "./export";
import Overview from "./overview";

import Progress from "./progress";
const TransitionGroup = Radium(ReactTransitionGroup);

@Radium
class Deck extends Component {
  constructor() {
    super();
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._goToSlide = this._goToSlide.bind(this);
    this.state = {
      lastSlide: null
    };
  }
  componentDidMount() {
    const slide = this._getSlideIndex();
    this.setState({
      lastSlide: slide
    });
    localStorage.setItem("spectacle-slide",
      JSON.stringify({slide: this.context.slide, forward: false, time: Date.now()}));
    this._attachEvents();
  }
  componentWillUnmount() {
    this._detachEvents();
  }
  _attachEvents() {
    window.addEventListener("storage", this._goToSlide);
    window.addEventListener("keydown", this._handleKeyPress);
  }
  _detachEvents() {
    window.removeEventListener("storage", this._goToSlide);
    window.removeEventListener("keydown", this._handleKeyPress);
  }
  _handleKeyPress(e) {
    const event = window.event ? window.event : e;
    // left, page down
    if (event.keyCode === 37 || event.keyCode === 33) {
      this._prevSlide();
    }
    // right, page up
    if (event.keyCode === 39 || event.keyCode === 34) {
      this._nextSlide();
    }
    if ((event.altKey && event.keyCode === 79) && !event.ctrlKey && !event.metaKey) { // o
      this._toggleOverviewMode();
    }
    if ((event.altKey && event.keyCode === 80) && !event.ctrlKey && !event.metaKey) { // p
      this._togglePresenterMode();
    }
  }
  _toggleOverviewMode() {
    const suffix = this.context.overview ? "" : "?overview";
    this.context.history.replaceState(null, `/${this.context.slide}${suffix}`);
  }
  _togglePresenterMode() {
    const suffix = this.context.presenter ? "" : "?presenter";
    this.context.history.replaceState(null, `/${this.context.slide}${suffix}`);
  }
  _getSuffix() {
    if (this.context.presenter) {
      return "?presenter";
    } else if (this.context.overview) {
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
      if (this._checkFragments(this.context.slide, data.forward)) {
        this.context.history.replaceState(null, `/${data.slide}${this._getSuffix()}`);
      }
    }
  }
  _prevSlide() {
    const slide = this._getSlideIndex();
    this.setState({
      lastSlide: slide
    });
    if (this._checkFragments(this.context.slide, false) || this.context.overview) {
      if (slide > 0) {
        this.context.history.replaceState(null, `/${this._getHash(slide - 1)}${this._getSuffix()}`);
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
    if (this._checkFragments(this.context.slide, true) || this.context.overview) {
      if (slide < this.props.children.length - 1) {
        this.context.history.replaceState(null, `/${this._getHash(slide + 1) + this._getSuffix()}`);
        localStorage.setItem("spectacle-slide",
          JSON.stringify({slide: this._getHash(slide + 1), forward: true, time: Date.now()}));
      }
    } else if (slide < this.props.children.length - 1) {
      localStorage.setItem("spectacle-slide",
        JSON.stringify({slide: this._getHash(slide), forward: true, time: Date.now()}));
    }
  }
  _getHash(slide) {
    let hash = slide;
    if ("id" in this.props.children[slide].props) {
      hash = this.props.children[slide].props.id;
    }
    return hash;
  }
  _checkFragments(slide, forward) {
    const store = this.context.flux.stores.SlideStore;
    const fragments = store.getState().fragments;
    // Not proud of this at all. 0.14 Parent based contexts will fix this.
    if (this.context.presenter) {
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
        this.context.flux.actions.SlideActions.updateFragment({
          fragment: hidden[0],
          visible: true
        });
        return false;
      }
      if (forward === false && hidden.length !== count) {
        this.context.flux.actions.SlideActions.updateFragment({
          fragment: visible[_.size(visible) - 1],
          visible: false
        });
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
    if (!parseInt(this.context.slide)) {
      Children.toArray(this.props.children).forEach((slide, i) => {
        if (slide.props.id === this.context.slide) {
          index = i;
        }
      });
    } else {
      index = parseInt(this.context.slide);
    }
    return index;
  }
  _renderSlide() {
    const slide = this._getSlideIndex();
    const child = Children.toArray(this.props.children)[slide];
    return cloneElement(child, {
      key: slide,
      children: Children.toArray(child.props.children),
      hash: this.context.slide,
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
    const globals = this.context.export ? {
      body: Object.assign(this.context.styles.global.body, {
        minWidth: 1100,
        minHeight: 850,
        overflow: "auto"
      })
    } : {};

    const styles = {
      deck: {
        backgroundColor: this.context.presenter || this.context.overview ? "black" : "",
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
    if (this.context.presenter) {
      componentToRender = (
        <Presenter
          slides={children}
          slide={this._getSlideIndex()}
          hash={this.context.slide}
          lastSlide={this.state.lastSlide}
        />
      );
    } else if (this.context.export) {
      componentToRender = <Export slides={children} />;
    } else if (this.context.overview) {
      componentToRender = <Overview slides={children} slide={this._getSlideIndex()} />;
    } else {
      componentToRender = (
        <TransitionGroup component="div" style={[styles.transition]}>
          {this._renderSlide()}
        </TransitionGroup>);

    }

    return (
      <div
        className="spectacle-deck"
        style={[styles.deck]}
        onClick={this._handleClick}
        {...this._getTouchEvents()}
      >
        {componentToRender}

        {
          !this.context.export ?
          <Progress
            items={children}
            currentSlide={this._getSlideIndex()}
            type={this.props.progress}
          /> : ""
        }
        <Style rules={Object.assign(this.context.styles.global, globals)} />
      </div>
    );
  }
}

Deck.displayName = "Deck";

Deck.defaultProps = {
  transitionDuration: 500,
  progress: "pacman"
};

Deck.propTypes = {
  children: PropTypes.node,
  transition: PropTypes.array,
  transitionDuration: PropTypes.number,
  progress: PropTypes.oneOf(["pacman", "bar", "number", "none"])
};

Deck.contextTypes = {
  styles: PropTypes.object,
  history: PropTypes.object,
  flux: PropTypes.object,
  presenter: PropTypes.bool,
  export: PropTypes.bool,
  overview: PropTypes.bool,
  slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Deck;
