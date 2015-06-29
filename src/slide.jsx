import React from 'react/addons';
import assign from 'object-assign';
import tweenState from 'react-tween-state';

const Slide = React.createClass({
  displayName: 'Slide',
  mixins: [tweenState.Mixin],
  contextTypes: {
    styles: React.PropTypes.object
  },
  getInitialState() {
    return {
      opacity: 0
    }
  },
  componentWillEnter(cb) {
    this.tweenState('opacity', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 300,
      endValue: 1,
      onEnd: cb
    });
  },
  componentWillAppear(cb) {
    this.tweenState('opacity', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 300,
      endValue: 1,
      onEnd: cb
    });
  },
  componentWillLeave(cb) {
    this.tweenState('opacity', {
      easing: tweenState.easingTypes.easeInOutQuad,
      duration: 300,
      endValue: 0,
      onEnd: cb
    });
  },
  render() {
    let styles = {
      opacity: this.getTweeningValue('opacity')
    };
    return (
      <div style={assign({}, styles, this.context.styles.slide)}>
        <div style={this.context.styles.slideInner}>
          <div style={this.context.styles.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
});

export default Slide;
