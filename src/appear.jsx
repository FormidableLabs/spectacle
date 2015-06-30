import React from 'react/addons';
import assign from 'object-assign';
import tweenState from 'react-tween-state';
import _ from 'lodash';

const Appear = React.createClass({
  mixins: [tweenState.Mixin],
  contextTypes: {
    flux: React.PropTypes.object,
    router: React.PropTypes.object,
    slide: React.PropTypes.number
  },
  getInitialState() {
    return {
      active: false,
      opacity: 0
    }
  },
  componentDidMount() {
    let state = this.context.flux.stores.SlideStore.getState();
    this.context.flux.stores.SlideStore.listen(this._storeChange);
    let slide = 'slide' in this.context.router.state.params ?
      this.context.router.state.params.slide : 0;
    this.context.flux.actions.SlideActions.addFragment({
      slide: slide,
      id: this._reactInternalInstance._rootNodeID,
      visible: false
    });
  },
  componentWillUnmount() {
    this.context.flux.stores.SlideStore.unlisten(this._storeChange);
  },
  _storeChange(state) {
    let slide = 'slide' in this.context.router.state.params ?
      this.context.router.state.params.slide : 0;
    let key = _.findKey(state.fragments[slide], {
      'id': this._reactInternalInstance._rootNodeID
    });
    if(state.fragments[slide].hasOwnProperty(key)) {
      this.setState({
        active: state.fragments[slide][key].visible
      }, () => {
        this.tweenState('opacity', {
          easing: tweenState.easingTypes.easeInOutQuad,
          duration: 300,
          endValue: this.state.active ? 1 : 0
        });
      });
    }
  },
  render() {
    let styles = {
      opacity: this.getTweeningValue('opacity')
    }
    return (
      <div style={styles} className="appear">
        {this.props.children}
      </div>
    )
  }
});

export default Appear;