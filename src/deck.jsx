import React from 'react/addons';
import assign from 'object-assign';
import cloneWithProps from 'react/lib/cloneWithProps';
import Radium from 'radium';
import _ from 'lodash';

React.initializeTouchEvents(true);

const Style = Radium.Style;

const TransitionGroup = Radium(React.addons.TransitionGroup);

@Radium
class Deck extends React.Component {
  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._goToSlide = this._goToSlide.bind(this);
    this.state = {
      lastSlide: null
    };
  }
  componentDidMount() {
    let slide = 'slide' in this.context.router.state.params ?
      parseInt(this.context.router.state.params.slide) : 0;
    this.setState({
      lastSlide: slide,
      presenter: this.context.router.state.location.query &&
        'presenter' in this.context.router.state.location.query
    });
    localStorage.setItem('spectacle-slide',
      JSON.stringify({slide: slide, forward: false, time: Date.now()}));
    this._attachEvents();
  }
  componentWillUnmount() {
    this._detachEvents();
  }
  _attachEvents() {
    window.addEventListener('storage', this._goToSlide);
    window.addEventListener('keydown', this._handleKeyPress);
  }
  _detachEvents() {
    window.removeEventListener('storage', this._goToSlide);
    window.removeEventListener('keydown', this._handleKeyPress);
  }
  _handleKeyPress(e) {
    let event = window.event ? window.event : e;
    event.keyCode === 37 && this._prevSlide();
    event.keyCode === 39 && this._nextSlide();
  }
  _goToSlide(e) {
    if(e.key === 'spectacle-slide') {
      let data = JSON.parse(e.newValue);
      let slide = 'slide' in this.context.router.state.params ?
        parseInt(this.context.router.state.params.slide) : 0;
      this.setState({
        lastSlide: slide || 0
      });
      if(this._checkFragments(slide, data.forward)) {
        this.context.router.replaceWith('/' + (data.slide));
      }
    }
  }
  _prevSlide() {
    let slide = 'slide' in this.context.router.state.params ?
      parseInt(this.context.router.state.params.slide) : 0;
    let presenter = this.state.presenter ? '?presenter' : '';
    this.setState({
      lastSlide: slide
    });
    if (this._checkFragments(slide, false)) {
      if (slide > 0) {
        this.context.router.replaceWith('/' + (slide - 1) + presenter);
        localStorage.setItem('spectacle-slide',
          JSON.stringify({slide: slide - 1, forward: false, time: Date.now()}));
      }
    } else {
      if (slide > 0) {
        localStorage.setItem('spectacle-slide',
          JSON.stringify({slide: slide, forward: false, time: Date.now()}));
      }
    }
  }
  _nextSlide() {
    let slide = 'slide' in this.context.router.state.params ?
      parseInt(this.context.router.state.params.slide) : 0;
    let presenter = this.state.presenter ? '?presenter' : '';
    this.setState({
      lastSlide: slide
    });
    if(this._checkFragments(slide, true)) {
      if (slide < this.props.children.length - 1) {
        this.context.router.replaceWith('/' + (slide + 1) + presenter);
        localStorage.setItem('spectacle-slide',
          JSON.stringify({slide: slide + 1, forward: true, time: Date.now()}));
      }
    } else {
      if (slide < this.props.children.length - 1) {
        localStorage.setItem('spectacle-slide',
          JSON.stringify({slide: slide, forward: true, time: Date.now()}));
      }
    }
  }
  _checkFragments(slide, forward) {
    let store = this.context.flux.stores.SlideStore;
    let fragments = store.getState().fragments;
    if (slide in fragments) {
      let count = _.size(fragments[slide]);
      let visible = _.filter(fragments[slide], function(s){
        return s.visible === true
      });
      let hidden = _.filter(fragments[slide], function(s){
        return s.visible !== true
      });
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
    var self = this;

    return {
      onTouchStart(e) {
        self.touchObject = {
          startX: event.touches[0].pageX,
          startY: event.touches[0].pageY
        }
      },
      onTouchMove(e) {
        var direction = self._swipeDirection(
          self.touchObject.startX,
          e.touches[0].pageX,
          self.touchObject.startY,
          e.touches[0].pageY
        );

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
      onTouchEnd(e) {
        self._handleSwipe(e);
      },
      onTouchCancel(e) {
        self._handleSwipe(e);
      }
    }
  }
  _handleClick(e) {
    if (this.clickSafe === true) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopPropagation();
    }
  }
  _handleSwipe(e) {
    if (typeof (this.touchObject.length) !== 'undefined' && this.touchObject.length > 44) {
      this.clickSafe = true;
    } else {
      this.clickSafe = false;
    }

    if (Math.abs(this.touchObject.length) > 20) {
      if(this.touchObject.direction === 1) {
        this._nextSlide();
      } else if (this.touchObject.direction === -1) {
        this._prevSlide();
      }
    }

    this.touchObject = {};
  }
  _swipeDirection(x1, x2, y1, y2) {
    var xDist, yDist, r, swipeAngle;

    xDist = x1 - x2;
    yDist = y1 - y2;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round(r * 180 / Math.PI);

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
  _renderSlide() {
    let slide = 'slide' in this.context.router.state.params ?
      parseInt(this.context.router.state.params.slide) : 0;
    let child = this.props.children[slide];
    if (this.state.presenter) {
      return this.props.children.map((child, index) => {
        if(index >= slide - 1 && index <= slide + 1) {
          let presenterStyle = {
            border: slide !== index ? '5px solid transparent' : '5px solid red',
            width: '33%',
            height: '50%',
            position: '',
            top: '',
            left: '',
            flex: 1,
            zoom: 0.5
          }
          return cloneWithProps(child, {
            key: index,
            presenterStyle: presenterStyle,
            contentScale: 0.5,
            slideIndex: slide,
            lastSlide: this.state.lastSlide,
            transition: [],
            transitionDuration: 0
          });
        }
      });
    } else if (this.context.router.state.location.query &&
        'export' in this.context.router.state.location.query) {
      return this.props.children.map((child, index) => {
        return cloneWithProps(child, {
          key: index,
          slideIndex: slide,
          lastSlide: this.state.lastSlide,
          transition: child.props.transition.length ?
            child.props.transition :
            this.props.transition,
          transitionDuration: child.props.transition.transitionDuration ?
            child.props.transitionDuration :
            this.props.transitionDuration
        });
      });
    } else {
      return cloneWithProps(child, {
        key: slide,
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
  }
  render() {
    let exportMode = false;

    if (this.context.router.state.location.query &&
        'export' in this.context.router.state.location.query) {
      exportMode = true;
    }

    let globals = exportMode ? {
      body: {
        minWidth: 1100,
        minHeight: 850,
        overflow: 'auto'
      }
    } : {};

    let styles = {
      deck: {
        backgroundColor: this.state.presenter ? 'black' : '',
        display: 'flex',
        width: '100%',
        height: '100%',
        perspective: 1000,
        transformStyle: 'preserve-3d'
      },
      transition: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
    };

    return (
      <div
        className="spectacle-deck"
        style={[styles.deck]}
        onClick={this._handleClick}
        {...this._getTouchEvents()}>
        <TransitionGroup component="div" style={[styles.transition]}>
          {this._renderSlide()}
        </TransitionGroup>
        <Style rules={assign(this.context.styles.global, globals)} />
      </div>
    )
  }
}

Deck.displayName = 'Deck';

Deck.defaultProps = {
  transitionDuration: 500
};

Deck.contextTypes = {
  styles: React.PropTypes.object,
  router: React.PropTypes.object,
  flux: React.PropTypes.object
};

export default Deck;