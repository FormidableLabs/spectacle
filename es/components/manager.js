function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var convertStyle = function convertStyle(styles) {
  return Object.keys(styles).map(function (key) {
    return "".concat(key, " { ").concat(toStringStyle(styles[key]), "} ");
  }).join('');
};

convertStyle = memoize(convertStyle);
var StyledDeck =
/*#__PURE__*/
styled("div", {
  target: "eaa55an0"
})(function (props) {
  return {
    backgroundColor: props.route.params.indexOf('presenter') !== -1 || props.route.params.indexOf('overview') !== -1 ? 'black' : '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  };
});
var StyledTransition =
/*#__PURE__*/
styled(ReactTransitionGroup, {
  target: "eaa55an1"
})({
  height: '100%',
  width: '100%',
  perspective: 1000,
  transformStyle: 'flat'
});

function buildSlideReference(props) {
  var slideReference = [];
  Children.toArray(props.children).forEach(function (child, rootIndex) {
    if (child.type === Magic) {
      Children.toArray(child.props.children).forEach(function (setSlide, magicIndex) {
        var reference = {
          id: setSlide.props.id || slideReference.length,
          magicIndex: magicIndex,
          rootIndex: rootIndex
        };
        slideReference.push(reference);
      });
    } else if (!child.props.hasSlideChildren) {
      var reference = {
        id: child.props.id || slideReference.length,
        rootIndex: rootIndex
      };

      if (child.props.goTo) {
        reference.goTo = child.props.goTo;
      }

      slideReference.push(reference);
    } else {
      child.props.children.forEach(function (setSlide, setIndex) {
        var reference = {
          id: setSlide.props.id || slideReference.length,
          setIndex: setIndex,
          rootIndex: rootIndex
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

export var Manager =
/*#__PURE__*/
function (_Component) {
  _inherits(Manager, _Component);

  function Manager(props) {
    var _this;

    _classCallCheck(this, Manager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Manager).apply(this, arguments));
    _this._getProgressStyles = _this._getProgressStyles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._getControlStyles = _this._getControlStyles.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleKeyPress = _this._handleKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleScreenChange = _this._handleScreenChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._goToSlide = _this._goToSlide.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._startAutoplay = _this._startAutoplay.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._stopAutoplay = _this._stopAutoplay.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._resetViewedIndexes = _this._resetViewedIndexes.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.presentationConnection = null;
    _this.state = {
      lastSlideIndex: null,
      slideReference: [],
      fullscreen: window.innerHeight === screen.height,
      mobile: window.innerWidth < props.contentWidth,
      autoplaying: props.autoplay ? props.autoplayOnStart : false
    };
    _this.viewedIndexes = new Set();
    _this.slideCache = null;
    return _this;
  }

  _createClass(Manager, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this2 = this;

      return {
        contentWidth: this.props.contentWidth,
        contentHeight: this.props.contentHeight,
        goToSlide: function goToSlide(slide) {
          return _this2._goToSlide({
            slide: slide
          });
        }
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var slideIndex = this._getSlideIndex();

      var autoplayOnStart = this.props.autoplay ? this.props.autoplayOnStart : false;
      this.setState({
        lastSlideIndex: slideIndex
      });

      this._attachEvents();

      if (autoplayOnStart) {
        this._startAutoplay();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.globalStyles && !this.context.store.getState().style.globalStyleSet) {
        this.props.dispatch(setGlobalStyle());
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._detachEvents();
    }
  }, {
    key: "_attachEvents",
    value: function _attachEvents() {
      var _this3 = this;

      window.addEventListener('storage', this._goToSlide);
      window.addEventListener('keydown', this._handleKeyPress);
      window.addEventListener('resize', this._handleScreenChange);

      if ((((navigator || {}).presentation || {}).receiver || {}).connectionList) {
        navigator.presentation.receiver.connectionList.then(function (list) {
          list.connections.map(function (connection) {
            _this3.presentationConnection = connection;
            connection.addEventListener('message', function (event) {
              _this3._goToSlide({
                key: 'spectacle-slide',
                newValue: event.data
              });
            });
          });
          list.addEventListener('connectionavailable', function (e) {
            _this3.presentationConnection = e.connection;
            e.connection.addEventListener('message', function (event) {
              _this3._goToSlide({
                key: 'spectacle-slide',
                newValue: event.data
              });
            });
          });
        });
      }
    }
  }, {
    key: "_detachEvents",
    value: function _detachEvents() {
      window.removeEventListener('storage', this._goToSlide);
      window.removeEventListener('keydown', this._handleKeyPress);
      window.removeEventListener('resize', this._handleScreenChange);
    }
  }, {
    key: "_startAutoplay",
    value: function _startAutoplay() {
      var _this4 = this;

      clearInterval(this.autoplayInterval);
      this.setState({
        autoplaying: true
      });
      this.autoplayInterval = setInterval(function () {
        _this4._nextSlide();
      }, this.props.autoplayDuration);
    }
  }, {
    key: "_stopAutoplay",
    value: function _stopAutoplay() {
      this.setState({
        autoplaying: false
      });
      clearInterval(this.autoplayInterval);
    }
  }, {
    key: "_toggleAutoplaying",
    value: function _toggleAutoplaying() {
      if (this.state.autoplaying) {
        this._stopAutoplay();
      } else {
        this._startAutoplay();
      }
    }
  }, {
    key: "_handleEvent",
    value: function _handleEvent(e) {
      // eslint-disable-line complexity
      var event = window.event ? window.event : e;

      if (event.keyCode === 37 || // 'ArrowLeft'|
      event.keyCode === 33 || // 'PageUp'
      event.keyCode === 32 && // 'Space'
      event.shiftKey) {
        this._prevSlide();

        this._stopAutoplay();
      } else if (event.keyCode === 39 || // 'ArrowRight'
      event.keyCode === 34 || // 'PageDown'
      event.keyCode === 32 && // 'Space'
      !event.shiftKey) {
        this._nextSlide();

        this._stopAutoplay();
      } else if (event.altKey && event.keyCode === 79 && // 'o'
      !event.ctrlKey && !event.metaKey) {
        this._toggleOverviewMode();
      } else if (event.altKey && event.keyCode === 80 && // 'p'
      !event.ctrlKey && !event.metaKey) {
        this._togglePresenterMode();
      } else if (event.altKey && event.keyCode === 84 && // 't'
      !event.ctrlKey && !event.metaKey) {
        this._toggleTimerMode();
      } else if (event.altKey && event.keyCode === 65 && // 'a'
      !event.ctrlKey && !event.metaKey && this.props.autoplay) {
        this._toggleAutoplaying();
      } else if (event.altKey && event.keyCode === 70 && // 'f'
      !event.ctrlKey && !event.metaKey) {
        toggleFullscreen();
      }
    }
  }, {
    key: "_handleKeyPress",
    value: function _handleKeyPress(e) {
      var event = window.event ? window.event : e;

      if (event.target instanceof HTMLInputElement || event.target.type === 'textarea' || event.target.contentEditable === 'true' || this.props.disableKeyboardControls) {
        return;
      }

      this._handleEvent(e);
    }
  }, {
    key: "_handleScreenChange",
    value: function _handleScreenChange() {
      this.setState({
        fullscreen: window.innerHeight === screen.height,
        mobile: window.innerWidth < this.props.contentWidth
      });
    }
  }, {
    key: "_toggleOverviewMode",
    value: function _toggleOverviewMode() {
      var suffix = this.props.route.params.indexOf('overview') !== -1 ? '' : '?overview';
      this.context.history.replace("/".concat(this.props.route.slide).concat(suffix));
    }
  }, {
    key: "_togglePresenterMode",
    value: function _togglePresenterMode() {
      var _this5 = this;

      var presenting = this.props.route.params.indexOf('presenter') !== -1;
      var suffix = presenting ? '' : '?presenter';
      var originalLocation = location.href;
      this.context.history.replace("/".concat(this.props.route.slide).concat(suffix));

      if (presenting === false && window.PresentationRequest) {
        var presentationRequest = new PresentationRequest(["".concat(originalLocation)]);
        navigator.presentation.defaultRequest = presentationRequest;
        presentationRequest.start().then(function (connection) {
          _this5.presentationConnection = connection;

          _this5.presentationConnection.addEventListener('message', function (data) {
            _this5._goToSlide({
              key: 'spectacle-slide',
              newValue: data.data
            });
          });
        });
      } else if (this.presentationConnection) {
        this.presentationConnection.terminate();
      }
    }
  }, {
    key: "_toggleTimerMode",
    value: function _toggleTimerMode() {
      var isTimer = this.props.route.params.indexOf('presenter') !== -1 && this.props.route.params.indexOf('timer') !== -1;
      var suffix = isTimer ? '?presenter' : '?presenter&timer';
      this.context.history.replace("/".concat(this.props.route.slide).concat(suffix));
    }
  }, {
    key: "_getSuffix",
    value: function _getSuffix() {
      if (this.props.route.params.indexOf('presenter') !== -1) {
        var isTimerMode = this.props.route.params.indexOf('timer') !== -1;
        return isTimerMode ? '?presenter&timer' : '?presenter';
      } else if (this.props.route.params.indexOf('overview') !== -1) {
        return '?overview';
      } else {
        return '';
      }
    }
  }, {
    key: "_goToSlide",
    value: function _goToSlide(e) {
      var data = null;
      var canNavigate = true;
      var offset = 0;

      if (e.key === 'spectacle-slide') {
        data = JSON.parse(e.newValue);
        canNavigate = this._checkFragments(this.props.route.slide, data.forward);
      } else if (e.slide) {
        data = e;
        offset = 1;
        var index = isNaN(parseInt(data.slide, 10)) ? get(this.state.slideReference.find(function (slide) {
          return slide.id === data.slide;
        }), 'rootIndex', 0) : data.slide - 1;
        var msgData = JSON.stringify({
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

      var slideIndex = this._getSlideIndex();

      this.setState({
        lastSlideIndex: slideIndex || 0
      });

      if (canNavigate) {
        var slide = data.slide;

        if (!isNaN(parseInt(slide, 10))) {
          slide = parseInt(slide, 10) - offset;
        }

        this.context.history.replace("/".concat(slide).concat(this._getSuffix()));
      }
    }
  }, {
    key: "_resetViewedIndexes",
    value: function _resetViewedIndexes() {
      this.viewedIndexes = new Set();
    }
  }, {
    key: "_prevSlide",
    value: function _prevSlide() {
      var slideIndex = this._getSlideIndex();

      this.setState({
        lastSlideIndex: slideIndex
      });
      this.viewedIndexes.delete(slideIndex);

      if (this._checkFragments(this.props.route.slide, false) || this.props.route.params.indexOf('overview') !== -1) {
        if (slideIndex > 0) {
          this.context.history.replace("/".concat(this._getHash(slideIndex - 1)).concat(this._getSuffix()));
          var msgData = JSON.stringify({
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
        var _msgData = JSON.stringify({
          slide: this._getHash(slideIndex),
          forward: false,
          time: Date.now()
        });

        localStorage.setItem('spectacle-slide', _msgData);

        if (this.presentationConnection) {
          this.presentationConnection.send(_msgData);
        }
      }
    }
  }, {
    key: "_nextUnviewedIndex",
    value: function _nextUnviewedIndex() {
      var sortedIndexes = Array.from(this.viewedIndexes).sort(function (a, b) {
        return a - b;
      });
      return Math.min((sortedIndexes[sortedIndexes.length - 1] || 0) + 1, this.state.slideReference.length - 1);
    }
  }, {
    key: "_getOffset",
    value: function _getOffset(slideIndex) {
      var _this6 = this;

      var goTo = this.state.slideReference[slideIndex].goTo;

      var nextUnviewedIndex = this._nextUnviewedIndex();

      if (goTo && !isNaN(parseInt(goTo))) {
        var goToIndex = function goToIndex() {
          if (_this6.viewedIndexes.has(goTo - 1)) {
            return _this6._nextUnviewedIndex();
          }

          return goTo - 1;
        };

        return goToIndex() - slideIndex;
      }

      return nextUnviewedIndex - slideIndex;
    }
  }, {
    key: "_nextSlide",
    value: function _nextSlide() {
      var slideIndex = this._getSlideIndex();

      this.setState({
        lastSlideIndex: slideIndex
      });
      var slideReference = this.state.slideReference;

      if (this._checkFragments(this.props.route.slide, true) || this.props.route.params.indexOf('overview') !== -1) {
        if (slideIndex === slideReference.length - 1) {
          // On last slide, loop to first slide
          if (this.props.autoplay && this.props.autoplayLoop && this.state.autoplaying) {
            var slideData = '{ "slide": "0", "forward": "false" }';

            this._goToSlide({
              key: 'spectacle-slide',
              newValue: slideData
            });

            this._resetViewedIndexes();
          }
        } else if (slideIndex < slideReference.length - 1) {
          this.viewedIndexes.add(slideIndex);

          var offset = this._getOffset(slideIndex);

          this.context.history.replace("/".concat(this._getHash(slideIndex + offset) + this._getSuffix()));
          var msgData = JSON.stringify({
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
        var _msgData2 = JSON.stringify({
          slide: this._getHash(slideIndex),
          forward: true,
          time: Date.now()
        });

        localStorage.setItem('spectacle-slide', _msgData2);

        if (this.presentationConnection) {
          this.presentationConnection.send(_msgData2);
        }
      }
    }
  }, {
    key: "_getHash",
    value: function _getHash(slideIndex) {
      return this.state.slideReference[slideIndex].id;
    }
  }, {
    key: "_updateFragment",
    value: function _updateFragment(fragData) {
      return updateFragment(fragData);
    }
  }, {
    key: "_checkFragments",
    value: function _checkFragments(slide, forward) {
      var state = this.context.store.getState();
      var fragments = state.fragment.fragments; // Not proud of this at all. 0.14 Parent based contexts will fix this.

      if (this.props.route.params.indexOf('presenter') !== -1) {
        var main = document.querySelector('.spectacle-presenter-main');

        if (main) {
          var frags = main.querySelectorAll('.fragment');

          if (!frags.length) {
            return true;
          }
        } else {
          return true;
        }
      }

      if (slide in fragments) {
        var currentSlideFragments = fragments[slide];
        var count = size(currentSlideFragments);
        var fullyAnimated = filter(currentSlideFragments, function (frag) {
          return frag.animations.every(function (anim) {
            return anim === true;
          });
        });
        var notFullyAnimated = filter(currentSlideFragments, function (frag) {
          return !frag.animations.every(function (anim) {
            return anim === true;
          });
        });

        if (forward === true && fullyAnimated.length !== count) {
          var target = notFullyAnimated[0];
          target.animations[target.animations.indexOf(false)] = true;
          this.props.dispatch(this._updateFragment({
            fragment: target,
            animations: target.animations
          }));
          return false;
        }

        if (forward === false) {
          if (notFullyAnimated.length === count && notFullyAnimated.every(function (frag) {
            return frag.animations.every(function (anim) {
              return anim === false;
            });
          })) {
            // If every fragment is animated back to square one, then switch slides
            return true;
          }

          var _target;

          var lastFullyAnimatedFragment = fullyAnimated[size(fullyAnimated) - 1];
          var lastNotFullyAnimatedFragment = notFullyAnimated[0];

          if (fullyAnimated.length === count || lastNotFullyAnimatedFragment.animations.every(function (a) {
            return a === false;
          })) {
            // if all fragments are fully animated, target the last fully animated fragment
            _target = lastFullyAnimatedFragment;
          } else if (notFullyAnimated !== count) {
            // if some fragments are not fully animated, continue targeting that fragment
            _target = lastNotFullyAnimatedFragment;
          }

          _target.animations[_target.animations.lastIndexOf(true)] = false;
          this.props.dispatch(this._updateFragment({
            fragment: _target,
            animations: _target.animations
          }));
          return false;
        }

        return true;
      } else {
        return true;
      }
    }
  }, {
    key: "_getTouchEvents",
    value: function _getTouchEvents() {
      var self = this;
      return {
        onTouchStart: function onTouchStart(e) {
          self.touchObject = {
            startX: e.touches[0].pageX,
            startY: e.touches[0].pageY
          };
        },
        onTouchMove: function onTouchMove(e) {
          var direction = self._swipeDirection({
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
            direction: direction
          };

          if (direction !== 0) {
            e.preventDefault();
          }
        },
        onTouchEnd: function onTouchEnd(e) {
          self._handleSwipe(e);
        },
        onTouchCancel: function onTouchCancel(e) {
          self._handleSwipe(e);
        }
      };
    }
  }, {
    key: "handleClick",
    value: function handleClick(e) {
      if (this.clickSafe === true) {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
      }
    }
  }, {
    key: "_handleSwipe",
    value: function _handleSwipe() {
      if (typeof this.touchObject.length !== 'undefined' && this.touchObject.length > 44) {
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
  }, {
    key: "_swipeDirection",
    value: function _swipeDirection(touch) {
      var xDist = touch.x1 - touch.x2;
      var yDist = touch.y1 - touch.y2;
      var r = Math.atan2(yDist, xDist);
      var swipeAngle = Math.round(r * 180 / Math.PI);

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
  }, {
    key: "_getSlideIndex",
    value: function _getSlideIndex() {
      var _this7 = this;

      var index = parseInt(this.props.route.slide);

      if (!Number.isFinite(index)) {
        var foundIndex = findIndex(this.state.slideReference, function (reference) {
          return _this7.props.route.slide === reference.id;
        });
        index = foundIndex >= 0 ? foundIndex : 0;
      }

      return index;
    }
  }, {
    key: "_getSlideByIndex",
    value: function _getSlideByIndex(index) {
      return getSlideByIndex(this.props.children, this.state.slideReference, index);
    }
  }, {
    key: "_renderSlide",
    value: function _renderSlide() {
      var slideIndex = this._getSlideIndex();

      var slide = this._getSlideByIndex(slideIndex);

      if (!slide) return null;
      var targetProps = {
        dispatch: this.props.dispatch,
        fragments: this.props.fragment,
        export: this.props.route.params.indexOf('export') !== -1,
        print: this.props.route.params.indexOf('print') !== -1,
        hash: this.props.route.slide,
        slideIndex: slideIndex,
        lastSlideIndex: this.state.lastSlideIndex,
        transition: (slide.props.transition || {}).length ? slide.props.transition : this.props.transition,
        transitionDuration: (slide.props.transition || {}).transitionDuration ? slide.props.transitionDuration : this.props.transitionDuration,
        slideReference: this.state.slideReference
      };
      return React.createElement(SlideWrapper, _extends({
        key: slideIndex
      }, slide.props, targetProps), cloneElement(slide, _objectSpread({}, slide.props, targetProps)));
    }
  }, {
    key: "_getProgressStyles",
    value: function _getProgressStyles() {
      var slideIndex = this._getSlideIndex();

      var slide = this._getSlideByIndex(slideIndex);

      if (slide && slide.props.progressColor) {
        return slide.props.progressColor;
      }

      return null;
    }
  }, {
    key: "_getControlStyles",
    value: function _getControlStyles() {
      var slideIndex = this._getSlideIndex();

      var slide = this._getSlideByIndex(slideIndex);

      if (slide && slide.props.controlColor) {
        return slide.props.controlColor;
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.route.slide === null) {
        return false;
      }

      var globals = this.props.route.params.indexOf('export') !== -1 ? {
        body: Object.assign(this.context.styles.global.body, {
          minWidth: this.state.mobile ? '100vw' : this.props.contentWidth + 150,
          minHeight: this.props.contentHeight + 150,
          overflow: 'auto'
        }),
        '.spectacle-presenter-next .fragment': {
          display: 'none !important'
        }
      } : {
        '.spectacle-presenter-next .fragment': {
          display: 'none !important'
        }
      };
      var componentToRender;
      var children = Children.toArray(this.props.children);

      if (this.props.route.params.indexOf('presenter') !== -1) {
        var isTimerMode = this.props.route.params.indexOf('timer') !== -1;
        componentToRender = React.createElement(Presenter, {
          dispatch: this.props.dispatch,
          slides: children,
          slideReference: this.state.slideReference,
          slideIndex: this._getSlideIndex(),
          hash: this.props.route.slide,
          route: this.props.route,
          lastSlideIndex: this.state.lastSlideIndex,
          timer: isTimerMode
        });
      } else if (this.props.route.params.indexOf('export') !== -1) {
        componentToRender = React.createElement(Export, {
          slides: children,
          slideReference: this.state.slideReference,
          route: this.props.route
        });
      } else if (this.props.route.params.indexOf('overview') !== -1) {
        componentToRender = React.createElement(Overview, {
          slides: children,
          slideReference: this.state.slideReference,
          slideIndex: this._getSlideIndex(),
          route: this.props.route,
          resetViewedIndexes: this._resetViewedIndexes
        });
      } else {
        componentToRender = React.createElement(StyledTransition, {
          component: "div"
        }, this._renderSlide());
      }

      var showControls = !this.state.fullscreen && !this.state.mobile && this.props.route.params.indexOf('export') === -1 && this.props.route.params.indexOf('overview') === -1 && this.props.route.params.indexOf('presenter') === -1;
      var _this$context$styles$ = this.context.styles.googleFonts,
          googleFonts = _this$context$styles$ === void 0 ? {} : _this$context$styles$;
      var googleFontsElements = Object.keys(googleFonts).map(function (key, index) {
        return React.createElement(Typeface, {
          googleFont: googleFonts[key].name,
          styles: googleFonts[key].styles,
          key: "gFont-".concat(index)
        });
      });
      return React.createElement(StyledDeck, _extends({
        className: "spectacle-deck",
        route: this.props.route,
        onClick: this.handleClick
      }, this._getTouchEvents()), this.props.controls && showControls && React.createElement(Controls, {
        currentSlideIndex: this._getSlideIndex(),
        totalSlides: this.state.slideReference.length,
        onPrev: this._prevSlide.bind(this),
        onNext: this._nextSlide.bind(this),
        controlColor: this._getControlStyles()
      }), googleFontsElements, componentToRender, this.props.route.params.indexOf('export') === -1 && this.props.route.params.indexOf('overview') === -1 ? React.createElement(Progress, {
        items: this.state.slideReference,
        currentSlideIndex: this._getSlideIndex(),
        type: this.props.progress,
        progressColor: this._getProgressStyles()
      }) : '', this.props.showFullscreenControl && !this.props.route.params.includes('export') && React.createElement(Fullscreen, null), this.props.autoplay ? React.createElement(AutoplayControls, {
        autoplaying: this.state.autoplaying,
        onPlay: this._startAutoplay,
        onPause: this._stopAutoplay
      }) : '', this.props.globalStyles && React.createElement("style", {
        dangerouslySetInnerHTML: {
          __html: convertStyle(Object.assign({}, this.context.styles.global, globals))
        }
      }));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      return {
        slideReference: buildSlideReference(nextProps)
      };
    }
  }]);

  return Manager;
}(Component);

_defineProperty(Manager, "displayName", 'Manager');

_defineProperty(Manager, "propTypes", {
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
});

_defineProperty(Manager, "contextTypes", {
  styles: PropTypes.object,
  print: PropTypes.object,
  history: PropTypes.object,
  presenter: PropTypes.bool,
  export: PropTypes.bool,
  overview: PropTypes.bool,
  store: PropTypes.object,
  slide: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
});

_defineProperty(Manager, "childContextTypes", {
  contentWidth: PropTypes.number,
  contentHeight: PropTypes.number,
  goToSlide: PropTypes.func
});

_defineProperty(Manager, "defaultProps", {
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
});

export default connect(function (state) {
  return state;
}, null, null, {
  withRef: true
})(Manager);